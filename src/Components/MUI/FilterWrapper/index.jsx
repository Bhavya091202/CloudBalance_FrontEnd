import React from "react";
import { FormControl, Select, MenuItem, Box, Typography } from "@mui/material";

const FilterSelectWrapper = ({ value, onChange }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        variant="outlined"
        sx={{
          "& .MuiSelect-select": {
            paddingY: "6px",
            paddingX: "10px",
            fontSize: "13px",
            textAlign: "center",
          },
        }}
        renderValue={() => (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body2" color="text.secondary">Include Only</Typography>
          </Box>
        )}
      >
        <MenuItem value="clear">Clear Filter</MenuItem>
        <MenuItem value="include">Include Only</MenuItem>
        <MenuItem value="exclude">Exclude Only</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterSelectWrapper;
