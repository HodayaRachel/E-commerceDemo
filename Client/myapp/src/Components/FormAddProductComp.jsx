import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormAddProductComp({newProduct, setNewProduct, errors, setErrors}) {


  const handleCheckValidation = () => {
    let errorsObj = {};

    if (!newProduct.Name || !newProduct.Name === "") {
      errorsObj.Name = "Name is required";
    } 
    if (!newProduct.Price || newProduct.Price === 0 || isNaN(newProduct.Price)) {
      errorsObj.Price = "Price is required";
    } else if (newProduct.Price < 50) {
      errorsObj.Price = "Price must be more than $50";
    } 
    if (!newProduct.Image || !newProduct.Image === "") {
      errorsObj.Image = "Image is required";
    } 
    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
    } else {
      setErrors({});
      console.log("Form submitted:", newProduct);
    }

  }

  useEffect(() => {
    handleCheckValidation()
  }, [newProduct]);


  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: 'auto' },
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="Name"
        label="Enter Product Name"
        type="text"
        variant="standard"
        error={!!errors.Name}
        helperText={errors.Name}
        InputLabelProps={{ shrink: true }}
        value={newProduct.Name}
        onChange={(e) => setNewProduct({...newProduct, Name: e.target.value})}
        color="grey"
      />
      <TextField
        name="Price"
        label="Enter Product Price"
        type="number"
        variant="standard"
        error={!!errors.Price}
        helperText={errors.Price}
        InputLabelProps={{ shrink: true }}
        value={newProduct.Price}
        onChange={(e) => setNewProduct({...newProduct, Price: +e.target.value})}
        color="grey"
      />
      <TextField
        name="Image"
        label="Enter Product Image Url"
        type="text"
        variant="standard"
        error={!!errors.Image}
        helperText={errors.Image}
        InputLabelProps={{ shrink: true }}
        value={newProduct.Image}
        onChange={(e) => setNewProduct({...newProduct, Image: e.target.value})}
        color="grey"
      />
    </Box>
  );
}
