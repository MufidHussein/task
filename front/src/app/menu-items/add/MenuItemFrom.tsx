"use client";
import AddFormBase from "@@/app/components/AddFormBase";
import CustomDateField from "@@/app/components/CustomDateField";
import CustomTextField from "@@/app/components/CustomTextField";
import React, { FC, useState } from "react";
import Typography from "@mui/material/Typography";

import { format, parseISO } from "date-fns";
import { Box, Chip } from "@mui/material";

interface Values {
  item_name: string;
  serving_times: string[];
}

interface MenuItemFromProps {
  onSubmit: (values: Values) => void;
}

const MenuItemFrom: FC<MenuItemFromProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<Values>({
    item_name: "",
    serving_times: [""],
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

  const handleServingTimesChange = (servingTimes: string[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      serving_times: servingTimes,
    }));
  };

  return (
    <AddFormBase title="Add Menu Item" onSubmit={handleSubmit}>
      <CustomTextField
        id="item_name"
        label="Item Name"
        name="item_name"
        type="text"
        value={formValues.item_name}
        onChange={handleTextFieldChange("item_name")}
      />
      <CustomDateField
        id="serving_times"
        label="Serving Times"
        name="serving_times"
        selectedDates={formValues.serving_times}
        onChange={handleServingTimesChange}
      />
      {formValues?.serving_times.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">Selected Dates:</Typography>
          <Box display="flex" flexWrap="wrap" mt={1}>
            {formValues?.serving_times?.map((date, index) => (
              <Chip
                key={index}
                label={format(parseISO(date), "MM/dd/yyyy HH:mm")}
                variant="outlined"
                style={{ marginRight: 8, marginBottom: 8 }}
                onDelete={() =>
                  handleServingTimesChange(
                    formValues?.serving_times?.filter((_, i) => i !== index)
                  )
                }
              />
            ))}
          </Box>
        </Box>
      )}
    </AddFormBase>
  );
};

export default MenuItemFrom;
