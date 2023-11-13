"use client";
import React, { FC, useState } from "react";
import AddFormBase from "@@/app/components/AddFormBase";
import CustomDateField from "@@/app/components/CustomDateField";
import CustomTextField from "@@/app/components/CustomTextField";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
enum Impact {
  Complete = "Complete shutdown",
  Partial = "Partial shutdown",
  Normal = "Normal operations",
}
interface Values {
  restaurant_id: string;
  maintenance_date_start: Date;
  maintenance_date_end: Date;
  impact_on_restaurant: any;
  quota_price: number;
  comments?: string;
}

interface MaintenanceHistoryFromProps {
  Restaurants: any[]; // Assuming this is correct, adjust if needed
  onSubmit: (values: Values) => void;
}

const MaintenanceHistoryFrom: FC<MaintenanceHistoryFromProps> = ({
  Restaurants,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState<Values>({
    restaurant_id: "",
    maintenance_date_start: new Date(),
    maintenance_date_end: new Date(),
    impact_on_restaurant: new Date(),
    quota_price: 0,
    comments: "",
  });

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  const handleTextFieldChange =
    (fieldName: keyof Values) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [fieldName]: event.target.value,
      }));
    };

  const handleImpactChange = (event: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      impact_on_restaurant: event.target.value,
    }));
  };
  return (
    <AddFormBase title="Add Maintenance History" onSubmit={handleSubmit}>
      <CustomTextField
        id="restaurant_id"
        label="Restaurant ID"
        name="restaurant_id"
        type="text"
        value={formValues.restaurant_id}
        onChange={handleTextFieldChange("restaurant_id")}
      />
      <CustomDateField
        id="maintenance_date_start"
        label="Maintenance Date Start"
        name="maintenance_date_start"
      />
      <CustomDateField
        id="maintenance_date_end"
        label="Maintenance Date End"
        name="maintenance_date_end"
      />
      <FormControl fullWidth>
        <InputLabel id="impact-on-restaurant-label">
          Impact on Restaurant
        </InputLabel>
        <Select
          labelId="impact-on-restaurant-label"
          id="impact_on_restaurant"
          value={formValues.impact_on_restaurant}
          onChange={handleImpactChange}
        >
          {Object.values(Impact).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CustomTextField
        id="quota_price"
        label="Quota Price"
        name="quota_price"
        type="number"
        value={formValues.quota_price}
        onChange={handleTextFieldChange("quota_price")}
      />
      <CustomTextField
        id="comments"
        label="Comments"
        name="comments"
        type="text"
        value={formValues.comments}
        onChange={handleTextFieldChange("comments")}
      />
    </AddFormBase>
  );
};

export default MaintenanceHistoryFrom;
