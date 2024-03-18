import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../Utils/ordersUtils";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Container, Typography, Button } from "@mui/material";

export default function TotalPriceComp({ items }) {
  console.log(items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = items.reduce((total, currentItem) => total + currentItem.product.Price * currentItem.qty, 0);
  const numItems = items
    .map((item) => item.qty)
    .reduce((totalQty, currentQty) => totalQty + currentQty, 0);
  const orderProducts = items.map((item) => ({
    ProductID: item.product._id,
    Quantity: item.qty,
  }));

  const handleClickPay = async () => {
    if (items.length > 0) {
      const data = await addOrder({
        Products: orderProducts,
        TotalPrice: totalPrice,
      });
      orderProducts.map((product) => {
        console.log(product.ProductID);
        dispatch({ type: "REMOVE_FROM_CART", payload: product.ProductID });
      });
      navigate("/products");
    }
  };

  return (
    <>
      <Fragment>
        <Box
          sx={{
            padding: 3,
            borderRadius: 3,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
            width: { lg: "20vw", xs: "200px", sm: "300px", md: "350px" },
            marginTop: 3,
            height: "fit-content",
            marginInline: {xs: 'auto', sm: 'auto', md: 'auto', lg: 0}

          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              <Typography>Total Price:</Typography>
              <Typography>${totalPrice}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              <Typography>Number Items:</Typography>
              <Typography>{numItems}</Typography>
            </Box>
            <Button
              onClick={handleClickPay}
              sx={{
                width: "100%",
                backgroundColor: "#60A2B5",
                color: "white",
                "&:hover": { backgroundColor: "#4D8291" },
              }}
            >
              Go to pay
            </Button>
          </Container>
        </Box>
      </Fragment>
    </>
  );
}
