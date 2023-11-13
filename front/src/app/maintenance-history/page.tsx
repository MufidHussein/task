"use client";

import { type GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import ApiCalls from "@@/api/ApiCalls";
import FormatDate from "../utils/FormatDate";

const MaintenanceHistoryPage = () => {
  const [Rows, setRows] = useState([]);
  useEffect(() => {
    ApiCalls.findMaintenanceHistory((response: any) => {
      setRows(response.data);
    });
  }, []);
  const columns: GridColDef[] = [
    {
      field: "maintenance_date_start",
      headerName: "Maintenance Date Start",
      width: 180,
      valueFormatter: (params) => FormatDate(params.value),
    },
    {
      field: "maintenance_date_end",
      headerName: "Maintenance Date End",
      width: 180,
      valueFormatter: (params) => FormatDate(params.value),
    },
    {
      field: "impact_on_restaurant",
      headerName: "Impact on Restaurant",
      width: 180,
      valueFormatter: (params) => FormatDate(params.value),
    },
    {
      field: "quota_price",
      headerName: "Quota Price",
      width: 180,
      valueFormatter: (params) => FormatDate(params.value),
    },
  ];

  return (
    <>
      <SideBar title="Menu Items" />
      <DataTable columns={columns} rows={Rows} />
    </>
  );
};

export default MaintenanceHistoryPage;
