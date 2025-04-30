import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { URLS } from "../../Services/url";
import { getApi } from "../../Services/commonService";
import { awsServiceColumns, tabMap } from "./AwsTableColumn";
import TableWrapper from "../../Components/TableWrapper";
import TabWrapper from "../../Components/MUI/TabWrapper";
import SelectWrapper from "../../Components/MUI/SelectWrapper";

const AwsService = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setAccountLoading(true);
        setSelectedAccount(null);

        const dataGet = await getApi(URLS.ACCOUNT);
        setAccounts(dataGet);
        setSelectedAccount(dataGet[0]);
        fetchData(tabMap[tabIndex].key, dataGet[0].accountId);
      } catch {
        setAccounts([]);
      } finally {
        setAccountLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const fetchData = async (type, accountId) => {
    try {
      setLoading(true);
      const res = await getApi(`${URLS[type]}?accountId=${accountId}`);
      setData(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error fetching resource data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const activeKey = tabMap[tabIndex].key;

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mb: 3}}>
          <Typography variant="h5">AWS Services</Typography>
          <SelectWrapper
            accounts={accounts}
            selectedAccount={selectedAccount}
            setSelectedAccount={(acc) => {
              setSelectedAccount(acc);
              if (acc?.accountId)
                fetchData(tabMap[tabIndex].key, acc.accountId);
            }}
            accountLoading={accountLoading}
            disableSelect={loading}
          />
        </Box>
        <TabWrapper
          tabMap={tabMap}
          tabIndex={tabIndex}
          setTabIndex={(tab) => {
            setTabIndex(tab);
            if (selectedAccount?.accountId)
              fetchData(tabMap[tab].key, selectedAccount.accountId);
          }}
          disableTabs={loading}
        />

        <Box sx={{ height: 600 }}>
          {loading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableWrapper
              rows={data}
              columns={
                awsServiceColumns[activeKey]?.map((col) => ({
                  key: col.field,
                  label: col.headerName,
                })) || []
              }
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AwsService;
