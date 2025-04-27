import React from "react";
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";

const SelectContainer = ({
  accounts = [],
  selectedAccount,
  setSelectedAccount,
  accountLoading = false,
  selectMinWidth = 200,
  disableSelect = false,
}) => {
  const handleAccountChange = (e) => {
    const acc = accounts.find((a) => a.arn === e.target.value);
    setSelectedAccount?.(acc || null);
  };

  return (
    <FormControl size="small" sx={{ minWidth: selectMinWidth }}>
      <InputLabel id="account-select-label">Select Account</InputLabel>
      {accountLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Select
          labelId="account-select-label"
          value={selectedAccount?.arn || ""}
          label="Select Account"
          onChange={handleAccountChange}
          disabled={disableSelect}
        >
          {accounts.map((acc) => (
            <MenuItem key={acc.arn} value={acc.arn}>
              {acc.name || acc.accountId || acc.arn}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default SelectContainer;
