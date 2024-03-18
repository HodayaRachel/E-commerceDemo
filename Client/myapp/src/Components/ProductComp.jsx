import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, ButtonBase } from "@mui/material";
import CounterButton from "./CounterButton";
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";

export default function ProductComp({ product }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [counter, setCounter] = useState(1); 

  const handleCounterChange = (newCount) => {
    setCounter(newCount);
  };

  const addToCart = () => dispatch({type: 'ADD_TO_CART', payload: {Product: product, Quantity: counter, Price: product.Price * counter}})

  const handleClickOrderNow = () => {
    addToCart()
    navigate('/cart')
  }


  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: {md: 5, sm: 5, xs: 0},
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        image={product.Image}
        style={{ objectFit: "cover", width: "100%" }}
      />

      <CardContent
        sx={{
          borderRadius: 3,
          backgroundColor: "#F1F7F9",
          position: "relative",
        }}
      >
        <Typography align="center" variant="subtitle1" color="text.secondary">
          {product.Name}
        </Typography>
        <CounterButton countNumber={counter} onCounterChange={handleCounterChange}/>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "space-around",
          backgroundColor: "white",
          borderRadius: 3,
          position: "relative",
          marginTop: -2,
          padding: 2,
        }}
      >
        <Button onClick={addToCart}
          sx={{ backgroundColor: "#8FBFCC", display: "inline", color: "white",
          "&:hover": { backgroundColor: '#7299A3'}

        }}
        >
          <Typography sx={{display: 'flex', alignItems: 'center'}}>
            ${product.Price * counter} | {" "}
            <AddShoppingCartIcon fontSize="small" sx={{ marginLeft: 1 }} />
          </Typography>
        </Button>
        <Button
          onClick={handleClickOrderNow}
          sx={{ backgroundColor: "#60A2B5", display: "inline", color: "white", 
          "&:hover": { backgroundColor: '#4D8291' }
        }}
        >
          <ButtonBase>Order Now</ButtonBase>
        </Button>
      </CardActions>
    </Card>
  );
}
