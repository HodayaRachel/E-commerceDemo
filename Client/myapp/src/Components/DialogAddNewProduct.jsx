import React, { useState, Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormAddProductComp from "./FormAddProductComp";
import { ButtonBase } from "@mui/material";
import { addNewProduct } from "../Utils/productsUtils";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

export default function DialogAddNewProduct({ setIsAddingProduct }) {
  const [open, setOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({});

  const [errors, setErrors] = useState({});

  console.log(newProduct);

  const handleClickCancle = () => {
    setNewProduct({ Name: "", Price: 0, Image: "" });
    setOpen(false);
  };

  const handleClickAdd = async () => {
    const res = await addNewProduct(newProduct);
    handleClickCancle();
    setIsAddingProduct(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
        <ButtonBase
          variant="outlined"
          sx={{
            backgroundColor: '#8FBFCC',
            color: 'white',
            fontWeight: 700,
            border: "3px",
            borderRadius: 3,
            padding: 1,
            paddingInline: 2,
            borderBlockStyle: "revert",
            borderBlockColor: "#60A2B5",
          }}
          onClick={handleClickOpen}
        >
          Add New Product
          <AddBusinessIcon sx={{ marginLeft: 2 }} />
        </ButtonBase>
      </Box>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClickCancle}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            backgroundColor: "#D8E5EB",
            color: "#60A2B5",
            textAlign: "center",
          }}
        >
          {"New Product"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#D8E5EB" }}>
          <FormAddProductComp
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            errors={errors}
            setErrors={setErrors}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#D8E5EB", display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
          <ButtonBase 
          sx={{
            width: 110,
            marginInline: 1,
            backgroundColor: '#8FBFCC',
            color: 'white',
            borderRadius: 1,
            padding: 1.5,
          }} 
          onClick={handleClickAdd}>Add</ButtonBase>
          <ButtonBase 
          sx={{
            width: 110,
            marginInline: 1,
            backgroundColor: '#8FBFCC',
            color: 'white',
            borderRadius: 1,
            padding: 1.5,
          }} 
          onClick={handleClickCancle}>Cancle</ButtonBase>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
