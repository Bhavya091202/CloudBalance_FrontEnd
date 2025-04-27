import { Box, Typography } from "@mui/material";
import SelectWrapper from "../../MUI/SelectWrapper";

const CostExplorerHeader = ({ accounts, selectedAccount, setSelectedAccount, accountLoading, loading, fetchData, tabMap, tabIndex }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h5">Cost Explorer</Typography>
    <SelectWrapper
      accounts={accounts}
      selectedAccount={selectedAccount}
      setSelectedAccount={(acc) => {
        setSelectedAccount(acc);
        if (acc?.accountId) {
          fetchData(tabMap[tabIndex]?.key, acc.accountId);
        }
      }}
      accountLoading={accountLoading}
      disableSelect={loading}
    />
  </Box>
);

export default CostExplorerHeader;
