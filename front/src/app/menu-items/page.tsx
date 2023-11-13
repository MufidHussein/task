"use client";

import { type GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import ApiCalls from "@@/api/ApiCalls";

const MenuItems = () => {
  const [Rows, setRows] = useState([]);
  useEffect(() => {
    ApiCalls.findAllMenuItems((response: any) => {
      setRows(response.data);
    });
  }, []);
  const columns: GridColDef[] = [
    {
      field: "item_name",
      headerName: "Item Name",
      type: "string",
      width: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
  ];

  return (
    <>
      <SideBar title="Menu Items" />
      <DataTable columns={columns} rows={Rows} />
    </>
  );
};

export default MenuItems;
