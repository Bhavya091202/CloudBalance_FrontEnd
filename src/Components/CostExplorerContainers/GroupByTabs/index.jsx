import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import TabWrapper from "../../MUI/TabWrapper";
import { monthOptions } from "../../../Pages/CostExplorer/CostExplorerConfig";
import SelectInput from "../../InputFieldWrapper/SelectFieldWrapper";

const GroupByTabs = ({
  tabMap,
  tabIndex,
  setTabIndex,
  fetchData,
  selectedAccount,
  loading,
  customSx,
  setTabMap,
  toggleFilterSidebar,
  startMonth,
  setStartMonth,
  endMonth,
  setEndMonth,
}) => (
  <TabWrapper
    tabMap={tabMap}
    tabIndex={tabIndex}
    setTabIndex={(tab, newTabMap) => {
      if (newTabMap) {
        setTabMap(newTabMap);
      }
      setTabIndex(tab);
      if (selectedAccount?.accountId) {
        const key = (newTabMap || tabMap)[tab]?.key;
        fetchData(key, selectedAccount.accountId);
      }
    }}
    disableTabs={loading}
    textOnGroup={"Group By:"}
    customSx={customSx}
    rightContent={
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {/* Month Selector Group */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Start Month */}
          <SelectInput
            inputFieldData={{
              name: "startMonth",
              label: "Start Month",
              options: monthOptions,
              wrapperClass: "flex flex-col",
              labelClass: "text-sm font-medium mb-1 text-gray-700",
              inputClass: "border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm w-40 mb-2",
            }}
            value={startMonth}
            handleChange={(e) => setStartMonth(e.target.value)}
          />

          {/* End Month */}
          <SelectInput
            inputFieldData={{
              name: "endMonth",
              label: "End Month",
              options: monthOptions,
              wrapperClass: "flex flex-col",
              labelClass: "text-sm font-medium mb-1 text-gray-700",
              inputClass: "border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm w-40 mb-2 mr-5", 
            }}
            value={endMonth}
            handleChange={(e) => setEndMonth(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <IconButton
          onClick={toggleFilterSidebar}
          sx={{
            backgroundColor: "#e3e7fd",
            color: "#5c6bc0",
            borderRadius: "8px",
            padding: "8px",
            "&:hover": { backgroundColor: "#d1d9fb" },
          }}
        >
          <FilterListIcon />
        </IconButton>
      </div>
    }
  />
);

export default GroupByTabs;
