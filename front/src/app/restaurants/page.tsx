import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import DataTable from "../components/DataTable";
import { type GridColDef } from "@mui/x-data-grid";
import ApiCalls from "@@/api/ApiCalls";
import FormatDate from "../utils/FormatDate";
import {
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import toast from "react-hot-toast";
const RestaurantsPage = () => {
  const [Rows, setRows] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setSelectedItems([]);
    setModalOpen(false);
  };

  const handleItemSelectionChange = (event: any) => {
    const selected = event.target.value;
    setSelectedItems(selected);
  };
  let data = {
    restaurantId: selectedRestaurant?.id,
    menuItemId: selectedItems,
  };
  const handleAddItems = () => {
    ApiCalls.addRestaurantMenuItems(
      data,
      () => {
        toast.success("Items was Submitted");
      },
      () => {
        toast.error("Something Went Wrong");
      }
    );
    handleCloseModal();
  };
  useEffect(() => {
    ApiCalls.findAllRestaurants((response: any) => {
      setRows(response.data);
    });
    ApiCalls.findAllMenuItems((response: any) => {
      setMenuItems(response.data);
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Restaurant name",
      width: 150,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 180,
    },
    {
      field: "street_name",
      headerName: "Street Name",
      width: 180,
    },
    {
      field: "opening_hours_start",
      headerName: "Opening Hours Start",
      width: 180,
      valueFormatter: (params) => FormatDate(params.value),
    },
    {
      field: "opening_hours_end",
      headerName: "Opening Hours End",
      width: 180,
      valueFormatter: (params) => FormatDate(params.value),
    },
    {
      field: "updateButton",
      headerName: "Update",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleOpenModal(params.row)}>
          <CreditScoreIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <SideBar title="Restaurants" />
      <DataTable columns={columns} rows={Rows} getRowId={(row) => row.id} />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Items to {selectedRestaurant?.name}
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="item-selection-label">Select Items</InputLabel>
            <Select
              labelId="item-selection-label"
              id="item-selection"
              multiple
              value={selectedItems}
              onChange={handleItemSelectionChange}
              label="Select Items"
            >
              {menuItems.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAddItems}>
            Add Items
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default RestaurantsPage;
