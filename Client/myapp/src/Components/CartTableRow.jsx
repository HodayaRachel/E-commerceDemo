import React, { useState, Fragment } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  Box,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useDispatch } from "react-redux";
import CounterButton from "./CounterButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function CartTableRow({
  product,
  onDelete,
  onSelect,
  onChangeQtyFunc,
}) {
  console.log(product);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(product.qty);
  const [select, setSelect] = useState(false);

  const handleCounterChange = (newCount) => {
    if (newCount - 1 === quantity) {
      dispatch({
        type: "INCREMENT_ITEM_FROM_CART",
        payload: {
          productId: product.product._id,
          Price: product.product.Price,
        },
      });
    } else {
      dispatch({
        type: "DECREMENT_ITEM_FROM_CART",
        payload: {
          productId: product.product._id,
          Price: product.product.Price,
        },
      });
    }
    onChangeQtyFunc(true);
    setQuantity(newCount);
  };

  const handleSelectClick = () => {
    setSelect(!select);
    onSelect(!select, product.product._id);
  };

  return (
    <Fragment key={product.product._id}>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, display: 'flex', justifyContent: 'center', padding: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", borderBottom: '1px solid #69696942'}}>
          <CardContent sx={{ display: "contents" }}>
            {onDelete === false ? (
              <></>
            ) : (
              <CardActions>
                <ButtonBase onClick={handleSelectClick}>
                  {select ? (
                    <CheckCircleOutlineIcon sx={{ color: "#60A2B5" }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: "#60A2B5" }} />
                  )}
                </ButtonBase>
              </CardActions>
            )}
            <Box sx={{maxWidth: {xs: onDelete === false ? '50px': '100px', sm: '100px', md: '250px'}, display: 'flex'}}>
            <CardMedia
              component="img"
              image={product.product.Image}
              style={{ objectFit: "scale-down", width: '100%' }}
            />
           </Box>
          </CardContent>
          <Box sx={{ paddingTop: 4}}>
            <CardContent
              sx={onDelete === false ? {
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: 0,
              } : 
              {
                display: 'flex',
                flexDirection: {xs: 'column', sm: "row-reverse"},
                alignItems: {xs: 'center', sm: "flex-start"},
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <Typography sx={{ fontSize: {xs: onDelete === false ? 'smaller': 'x-small', sm: 'small'}, color: 'GrayText'}}>{product.product.Name}</Typography>
              {onDelete === false ? (
                <></>
              ) : (
                <CardActions sx={{ paddingTop: 0 }}>
                  <ButtonBase onClick={() => onDelete(product.product._id)}>
                    <DeleteIcon fontSize="medium" sx={{ color: "#60A2B5" }} />
                  </ButtonBase>
                </CardActions>
              )}
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <Typography sx={{ margin: "auto", marginRight: 0, fontSize: {xs: 'smaller', sm: 'small'}, color: 'GrayText' }}>
                ${product.product.Price}
              </Typography>
              {onDelete === false ? (
                <Typography sx={{ margin: "auto", marginRight: 0, fontSize: {xs: 'smaller', sm: 'small'}, color: 'GrayText' }}>
                {product.qty} x
              </Typography>
              ) : (
                <CardActions sx={{ paddingTop: 0 }}>
                  <CounterButton
                    countNumber={quantity}
                    onCounterChange={handleCounterChange}
                  />
                </CardActions>
              )}
            </CardContent>
            <CardContent sx={{padding: 0}}>
              <Typography sx={{ margin: "auto", fontSize: {xs: onDelete === false ? 'smaller': 'x-small', sm: 'small'}, color: 'GrayText', textAlign: {xs: 'center'}}}>
                product code: {product.product.Code}
              </Typography>
            </CardContent>
          </Box>
        </Box>
        {/* <br />
        <TableCell
          sx={{ textAlign: "center", color: "gray" }}
          component="th"
          scope="row"
        >
          {product.product.Name}
        </TableCell>
        <TableCell
          sx={{ textAlign: "center", color: "gray" }}
          component="th"
          scope="row"
        >
          {product.product.Code}
        </TableCell>
        <TableCell
          sx={{ textAlign: "center", color: "gray" }}
          component="th"
          scope="row"
        >
          {product.product.Price}
        </TableCell>
        <TableCell
          sx={{ textAlign: "center", color: "gray" }}
          component="th"
          scope="row"
        >
          {!onDelete ? (
            <>{product.qty}</>
          ) : (
            <CounterButton
              countNumber={quantity}
              onCounterChange={handleCounterChange}
            />
          )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }} component="th" scope="row">
          <img width={150} src={product.product.Image} />
        </TableCell>
        {onDelete === false ? (
          <></>
        ) : (
          <Fragment>
            <TableCell sx={{ textAlign: "center" }} component="th" scope="row">
              <ButtonBase onClick={() => onDelete(product.product._id)}>
                <DeleteIcon fontSize="medium" sx={{ color: "#60A2B5" }} />
              </ButtonBase>
            </TableCell>
            <TableCell padding="checkbox">
              <ButtonBase onClick={handleSelectClick}>
                {select ? (
                  <CheckCircleOutlineIcon sx={{ color: "#60A2B5" }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ color: "#60A2B5" }} />
                )}
              </ButtonBase>
            </TableCell>
          </Fragment>
        )} */}
      </TableRow>
    </Fragment>
  );
}
