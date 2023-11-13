"use client";
import AddFormBase from "@@/app/components/AddFormBase";
import CustomDateField from "@@/app/components/CustomDateField";
import CustomTextField from "@@/app/components/CustomTextField";
import React, { FC, useState } from "react";
import { IconButton, Box, Typography, TextField } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

interface Values {
  name: string;
  phone_number: string;
  street_name: string;
  opening_hours_start: Date;
  opening_hours_end: Date;
  nearby_landmarks: string[];
}

interface RestaurantFormProps {
  onSubmit: (values: Values) => void;
}

const RestaurantForm: FC<RestaurantFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<Values>({
    name: "",
    phone_number: "",
    street_name: "",
    opening_hours_start: new Date(),
    opening_hours_end: new Date(),
    nearby_landmarks: [""],
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

  const handleDateFieldChange =
    (fieldName: keyof Values) => (date: Date | null) => {
      if (date !== null) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [fieldName]: date,
        }));
      }
    };

  const handleNearbyLandmarksChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLandmarks = [...formValues.nearby_landmarks];
      newLandmarks[index] = event.target.value;
      setFormValues((prevValues) => ({
        ...prevValues,
        nearby_landmarks: newLandmarks,
      }));
    };

  const addLandmarkField = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      nearby_landmarks: [...prevValues.nearby_landmarks, ""],
    }));
  };

  const removeLandmarkField = (index: number) => {
    const newLandmarks = [...formValues.nearby_landmarks];
    newLandmarks.splice(index, 1);
    setFormValues((prevValues) => ({
      ...prevValues,
      nearby_landmarks: newLandmarks,
    }));
  };

  return (
    <AddFormBase title="Add Restaurant" onSubmit={handleSubmit}>
      <CustomTextField
        id="name"
        label="Restaurant Name"
        name="name"
        type="text"
        value={formValues.name}
        onChange={handleTextFieldChange("name")}
      />
      <CustomTextField
        id="phone_number"
        label="Phone Number"
        name="phone_number"
        type="number"
        value={formValues.phone_number}
        onChange={handleTextFieldChange("phone_number")}
      />
      <CustomTextField
        id="street_name"
        label="Street Name"
        name="street_name"
        type="text"
        value={formValues.street_name}
        onChange={handleTextFieldChange("street_name")}
      />
      <CustomDateField
        id="opening_hours_start"
        label="Opening Hours Start "
        name="opening_hours_start"
        selectedDates={[formValues.opening_hours_start.toISOString()]}
        onChange={(dates) =>
          handleDateFieldChange("opening_hours_start")(new Date(dates[0]))
        }
      />
      <CustomDateField
        id="opening_hours_end"
        label="Opening Hours End"
        name="opening_hours_end"
        selectedDates={[formValues.opening_hours_end.toISOString()]}
        onChange={(dates) =>
          handleDateFieldChange("opening_hours_end")(new Date(dates[0]))
        }
      />
      <Typography variant="subtitle1">Nearby Landmarks:</Typography>
      {formValues.nearby_landmarks.map((landmark, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            label={`Landmark #${index + 1}`}
            value={landmark}
            onChange={handleNearbyLandmarksChange(index)}
            fullWidth
          />
          {index > 0 && (
            <IconButton onClick={() => removeLandmarkField(index)}>
              <RemoveIcon />
            </IconButton>
          )}
          {index === formValues.nearby_landmarks.length - 1 && (
            <IconButton onClick={addLandmarkField}>
              <AddIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </AddFormBase>
  );
};

export default RestaurantForm;
