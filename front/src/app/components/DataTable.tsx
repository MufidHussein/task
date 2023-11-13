"use client";
import * as React from "react";
import { type FC, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Layout from "./Layout";

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  getRowId?: (row: any) => string;
}

const DataTable: FC<DataTableProps> = ({ columns, rows, getRowId }) => {
  return (
    <Layout>
      <DataGrid
        sx={{
          px: "1rem",
          height: "100%",
        }}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Layout>
  );
};

export default DataTable;
