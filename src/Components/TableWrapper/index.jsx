import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

const TableWrapper = ({ columns = [], rows = [] }) => {
  const gridColumns = columns.map(col => ({
    field: col.key,
    headerName: col.label,
    flex: 1,
    sortable: true,
    filterable: true,
    renderCell: col.render
      ? (params) => col.render(params.value, params.row)
      : undefined,
  }));

  const gridRows = rows.map((row, index) => ({
    id: row.id || index,
    ...row,
  }));

  return (
    <Paper elevation={3} style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={gridRows}
        columns={gridColumns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20, 50]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
        }}
      />
    </Paper>
  );
};

export default TableWrapper;
