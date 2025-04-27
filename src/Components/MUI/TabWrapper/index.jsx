import React from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TabWrapper = ({
  tabMap = {},
  tabIndex = 0,
  setTabIndex,
  disableTabs = false,
  maxTabs = 6,
  textOnGroup = "",
  customSx = {},
  rightContent = null,
}) => {
  const tabValues = Object.values(tabMap);
  const mainTabs = tabValues.slice(0, maxTabs);
  const moreTabs = tabValues.slice(maxTabs);

  const handleTabChange = (_, newIndex) => {
    setTabIndex?.(newIndex);
  };

  const handleMoreChange = (e) => {
    const selectedKey = e.target.value;
    const index = tabValues.findIndex((tab) => tab.key === selectedKey);
    if (index !== -1) {
      const updatedTabValues = [...tabValues];
      const selectedTab = updatedTabValues.splice(index, 1)[0];
      updatedTabValues.unshift(selectedTab);
      const newTabMap = updatedTabValues.reduce((acc, item, idx) => {
        acc[idx] = item;
        return acc;
      }, {});
      setTabIndex?.(0, newTabMap);
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 2,
      backgroundColor: "#f9fafb",
      p: 2,
      border: 1,
      borderColor: "#e0e0e0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
  
      {/* Left Side - GroupBy and Tabs */}
      <Box
        sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "14px", mr: 1 }}>
          {textOnGroup}
        </Typography>

        <Tabs
          value={tabIndex < maxTabs ? tabIndex : false}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            minHeight: "32px",
            "& .MuiTab-root": {
              minHeight: "32px",
              textTransform: "none",
            },
            ...customSx,
          }}
        >
          {mainTabs.map((tab, idx) => (
            <Tab key={idx} label={tab.label} disabled={disableTabs} />
          ))}
        </Tabs>

        {moreTabs.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              labelId="more-tab-label"
              value="more"
              onChange={handleMoreChange}
              renderValue={() => "More"}
            >
              {moreTabs.map((tab) => (
                <MenuItem key={tab.key} value={tab.key}>
                  {tab.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {rightContent && <Box>{rightContent}</Box>}
    </Box>
  );
};

export default TabWrapper;
