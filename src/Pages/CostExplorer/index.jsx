import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getApi, postApi } from "../../Services/commonService";
import { URLS } from "../../Services/url";
import CostExplorerHeader from "../../Components/CostExplorerContainers/costExplorerHeader";
import GroupByTabs from "../../Components/CostExplorerContainers/GroupByTabs";
import CustomizeFilterSidebar from "../../Components/CostExplorerContainers/CustomizeFilterSidebar";
import { transformDbDataToFusionChart } from "../../Utils/transformChartDatatoFusionChart";
import FusionChartWrapper from "../../Components/FusionGrabh";
import TableWrapper from "../../Components/TableWrapper";
import { transformDbDataToTableChart } from "../../Utils/transformChartDataTableInput";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const CostExplorer = () => {
  const [tabMap, setTabMap] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [data, setData] = useState({ categories: [], dataset: [] });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);
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
        setSelectedAccount(null);

        const accountData = await getApi(URLS.ACCOUNT);
        const groupByData = await getApi(URLS.GROUP_BY_COST_EXPLORER);

        const generatedTabMap = groupByData.reduce((acc, item, index) => {
          acc[index] = {
            label: item.displayName,
            key: item.databaseName,
          };
          return acc;
        }, {});

        setAccounts(accountData);
        setSelectedAccount(accountData?.[0]);
        setTabMap(generatedTabMap);
      } catch {
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
      setLoading(true);
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
    } catch (err) {
      console.error("Error fetching resource data:", err);
      setData({ categories: [], dataset: [] });
      setTabData({ categories: [], dataset: [] });
    } finally {
      setLoading(false);
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

  const downloadExcel = () => {
    const { columns, rows } = tabData;

    if (!rows || rows.length === 0) {
      alert("No data to export!");
      return;
    }

    const exportData = rows.map((row) => {
      const newRow = {};
      columns.forEach((col) => {
        newRow[col.label] = row[col.key];
      });
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cost Explorer Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "CostExplorerData.xlsx");
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header stays normally */}
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

      {/* Tabs stay normally */}
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

      <Box
        className="relative flex"
        sx={{
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            width: isFilterSidebarOpen ? "75%" : "100%",
            transition: "all 0.3s ease",
            paddingRight: isFilterSidebarOpen ? "16px" : "0",
          }}
        >
          {/* First Chart - Bar Chart */}
          <div>
            {loading ? (
              <div>Loading chart...</div>
            ) : (
              <FusionChartWrapper
                chartConfig={{
                  type: "mscolumn2d",
                  width: "100%",
                  height: "400",
                  dataFormat: "json",
                  dataSource: {
                    chart: {
                      caption: "Region Wise Monthly Usage Cost",
                      xAxisName: "Month",
                      yAxisName: "Cost ($)",
                      numberSuffix: "Cost ($)",
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
            )}
          </div>

          {/* Second Chart - Line Chart */}
          <div className="mt-8">
            {loading ? (
              <div>Loading line chart...</div>
            ) : (
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
            )}
          </div>

          <div className="mt-6 mb-4 flex justify-end">
            <button
              onClick={downloadExcel}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
            >
              📥 Download Excel
            </button>
          </div>

          {/* Table Section */}
          <div className="mt-8">
            {loading ? (
              <div>Loading table...</div>
            ) : (
              (() => {
                const { columns, rows } = tabData;
                return <TableWrapper columns={columns} rows={rows} />;
              })()
            )}
          </div>
        </Box>

        {/* Sidebar */}
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
