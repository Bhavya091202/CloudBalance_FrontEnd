export const tabMap = {
  0: { label: "EC2", key: "EC2" },
  1: { label: "RDS", key: "RDS" },
  2: { label: "ASG", key: "ASG" },
};

export const awsServiceColumns = {
  EC2: [
    { field: "resourceId", headerName: "Resource ID", flex: 1 },
    { field: "resourceName", headerName: "Resource Name", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ],
  RDS: [
    { field: "resourceId", headerName: "Resource ID", flex: 1 },
    { field: "resourceName", headerName: "Resource Name", flex: 1 },
    { field: "engine", headerName: "Engine", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ],
  ASG: [
    { field: "resourceId", headerName: "Resource ID", flex: 1 },
    { field: "resourceName", headerName: "Resource Name", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "desiredCapacity", headerName: "Desired Capacity", flex: 1 },
    { field: "minSize", headerName: "Min Size", flex: 1 },
    { field: "maxSize", headerName: "Max Size", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ],
};
