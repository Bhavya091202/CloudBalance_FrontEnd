import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getApi, postApi } from "../../Services/commonService";
import { URLS } from "../../Services/url";
import CostExplorerHeader from "../../Components/CostExplorerContainers/costExplorerHeader";
import GroupByTabs from "../../Components/CostExplorerContainers/GroupByTabs";
import CustomizeFilterSidebar from "../../Components/CostExplorerContainers/CustomizeFilterSidebar";
import { transformDbDataToFusionChart } from "../../Utils/transformChartDatatoFusionChart";
import FusionChartWrapper from "../../Components/FusionGrabh";
import TableWrapper from "../../Components/TableWrapper";
import { transformDbDataToTableChart } from "../../Utils/transformChartDataTableInput";
import { downloadExcelFile } from "../../Utils/downloadInExcel";

const CostExplorer = () => {
  const [tabMap, setTabMap] = useState({}); // group by tabs and filter
  const [tabIndex, setTabIndex] = useState(0); // index of tab
  const [accounts, setAccounts] = useState([]); // all account in user and snowflake
  const [selectedAccount, setSelectedAccount] = useState(null); //  account selected
  const [data, setData] = useState({ categories: [], dataset: [] }); // data grph table
  const [appliedFilters, setAppliedFilters] = useState({}); // filters where clause
  const [loading, setLoading] = useState(false); // loading
  const [graphLoading, setGraphLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true); // account Loading
  const [filterData, setFilterData] = useState([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startMonth, setStartMonth] = useState("01-2024");
  const [endMonth, setEndMonth] = useState("05-2025");
  const [tabData, setTabData] = useState({});

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setAccountLoading(true);
        const accountData = await getApi(URLS.ACCOUNT);
        const groupByData = await getApi(URLS.GROUP_BY_COST_EXPLORER);

        const generatedTabMap = groupByData.reduce((acc, item, index) => {
          acc[index] = {
            label: item.displayName,
            key: item.databaseName,
          };
          return acc;
        }, {});

        const firstAccount = accountData?.[0];
        setAccounts(accountData);
        setSelectedAccount(firstAccount);
        setTabMap(generatedTabMap);

        if (firstAccount && Object.keys(generatedTabMap).length > 0) {
          const firstKey = generatedTabMap[0].key;
          await fetchData(firstKey, firstAccount.accountId);
        }
      } catch (error) {
        console.error("Error in fetchAccounts:", error);
        setAccounts([]);
      } finally {
        setAccountLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const fetchData = async (
    type,
    accountId,
    filters = appliedFilters,
    startDate = startMonth,
    endDate = endMonth
  ) => {
    try {
      setGraphLoading(true);
      const payload = {
        groupBy: type,
        startDate: startDate,
        endDate: endDate,
        filters: {
          LINKEDACCOUNTID: [accountId],
          ...filters,
        },
      };
      const res = await postApi(URLS.DYNAMIC_QUERY, payload);

      setTabData(transformDbDataToTableChart(res, type));
      setData(transformDbDataToFusionChart(res, type));
      // console.log("table data: ", transformDbDataToTableChart(res, type));
      // console.log("Chart Data: ", transformDbDataToFusionChart(res, type));
    } catch (err) {
      console.error("Error fetching resource data:", err);
      setData({ categories: [], dataset: [] });
      setTabData({ categories: [], dataset: [] });
    } finally {
      setGraphLoading(false);
    }
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen((prev) => !prev);
  };

  const toggleOption = (item) => {
    setSelectedOptions((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const applySelectedOptions = (filterKey) => {
    if (selectedOptions.length > 0) {
      setAppliedFilters((prev) => {
        const updatedFilters = {
          ...prev,
          [filterKey]: selectedOptions,
        };

        if (selectedAccount?.accountId && tabMap[tabIndex]?.key) {
          fetchData(
            tabMap[tabIndex].key,
            selectedAccount.accountId,
            updatedFilters
          );
        }
        return updatedFilters;
      });
    } else {
      setAppliedFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[filterKey];

        if (selectedAccount?.accountId && tabMap[tabIndex]?.key) {
          fetchData(
            tabMap[tabIndex].key,
            selectedAccount.accountId,
            newFilters
          );
        }
        return newFilters;
      });
    }

    setOpenFilter(null);
    setSelectedOptions([]);
  };

  const fetchFilter = async (value) => {
    try {
      setLoading(true);
      const res = await getApi(`${URLS.FILTER_WHERE_DATA}?filterName=${value}`);
      setFilterData(res);
    } catch (err) {
      console.error("Error fetching filter data:", err);
      setFilterData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <CostExplorerHeader
          accounts={accounts}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          accountLoading={accountLoading}
          loading={loading}
          fetchData={fetchData}
          tabMap={tabMap}
          tabIndex={tabIndex}
        />
      </Box>

      {/* Tabs */}
      <GroupByTabs
        tabMap={tabMap}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        fetchData={fetchData}
        selectedAccount={selectedAccount}
        loading={loading}
        customSx={{}}
        toggleFilterSidebar={toggleFilterSidebar}
        setTabMap={setTabMap}
        startMonth={startMonth}
        setStartMonth={(date) => {
          setStartMonth(date);
          if (selectedAccount?.accountId && tabMap[tabIndex]?.key) {
            fetchData(
              tabMap[tabIndex].key,
              selectedAccount.accountId,
              appliedFilters,
              date,
              endMonth
            );
          }
        }}
        endMonth={endMonth}
        setEndMonth={(date) => {
          setEndMonth(date);
          if (selectedAccount?.accountId && tabMap[tabIndex]?.key) {
            fetchData(
              tabMap[tabIndex].key,
              selectedAccount.accountId,
              appliedFilters,
              startMonth,
              date
            );
          }
        }}
      />

      {/* Main Layout */}
      <Box className="relative flex" sx={{ transition: "all 0.3s ease" }}>
        {/* Main Content Area */}
        <Box
          sx={{
            width: isFilterSidebarOpen ? "75%" : "100%",
            transition: "all 0.3s ease",
            paddingRight: isFilterSidebarOpen ? "16px" : "0",
          }}
        >
          {/* Graphs */}
          {graphLoading ? (
            <Box
              sx={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={60} thickness={5} />
            </Box>
          ) : (
            <>
              <div>
                <FusionChartWrapper
                  chartConfig={{
                    type: "mscolumn2d",
                    width: "100%",
                    height: "400",
                    dataFormat: "json",
                    dataSource: {
                      chart: {
                        caption: `${tabMap[tabIndex]?.label} Wise Monthly Usage Cost`,
                        xAxisName: "Month",
                        yAxisName: "Cost ($)",
                        numberPrefix: "$",
                        labelPadding: "20",
                        labelDisplay: "auto",
                        theme: "fusion",
                        drawCrossLine: "1",
                      },
                      categories: [{ category: data.categories }],
                      dataset: data.dataset,
                    },
                  }}
                />
              </div>

              <div className="mt-8">
                <FusionChartWrapper
                  chartConfig={{
                    type: "msline",
                    width: "100%",
                    height: "400",
                    dataFormat: "json",
                    dataSource: {
                      chart: {
                        caption: "Monthly Cost Overview",
                        xAxisName: "Month",
                        yAxisName: "Cost ($)",
                        theme: "fusion",
                        drawAnchors: "1",
                        showValues: "0",
                        lineThickness: "2",
                        labelPadding: "20",
                        labelDisplay: "auto",
                        legendPosition: "bottom",
                        drawCrossLine: "1",
                      },
                      categories: [{ category: data.categories }],
                      dataset: data.dataset,
                    },
                  }}
                />
              </div>

              {/* Download Excel */}
              <div className="mt-6 mb-4 flex justify-end">
                <button
                  onClick={() =>
                    downloadExcelFile({
                      rows: tabData.rows,
                      columns: tabData.columns,
                      sheetName: "Cost Explorer Data",
                      fileName: "CostExplorerData.xlsx",
                    })
                  }
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition duration-200 ease-in-out hover:shadow-lg active:scale-95"
                >
                  <span>📥</span> <span>Download Excel</span>
                </button>
              </div>

              {/* Table */}
              <div className="mt-8">
                {loading ? (
                  <div>Loading table...</div>
                ) : (
                  <TableWrapper columns={tabData.columns} rows={tabData.rows} />
                )}
              </div>
            </>
          )}
        </Box>

        {/* Filter Sidebar */}
        {isFilterSidebarOpen && (
          <Box
            sx={{
              width: "25%",
              transition: "all 0.3s ease",
            }}
          >
            <CustomizeFilterSidebar
              open={isFilterSidebarOpen}
              onClose={() => {
                setIsFilterSidebarOpen(false);
                setOpenFilter(null);
                setSelectedOptions([]);
                setSearchTerm("");
                setFilterData([]);
              }}
              onClearAllFilters={() => {
                setAppliedFilters({});
                setOpenFilter(null);
                setSelectedOptions([]);
                setSearchTerm("");
                setFilterData([]);

                if (selectedAccount?.accountId && tabMap[tabIndex]?.key) {
                  fetchData(
                    tabMap[tabIndex].key,
                    selectedAccount.accountId,
                    {}
                  );
                }
              }}
              tabMap={tabMap}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              loading={loading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterData={filterData}
              selectedOptions={selectedOptions}
              toggleOption={toggleOption}
              applySelectedOptions={applySelectedOptions}
              setSelectedOptions={setSelectedOptions}
              fetchFilter={fetchFilter}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CostExplorer;
