import React, { useState, useEffect } from "react";
import { Button, ButtonBase } from "@mui/material";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function CounterButton({ countNumber, onCounterChange }) {
  const [counter, setCounter] = useState(countNumber);

  const handleClickPlus = async () => {
    if (counter < 5) {
      setCounter(counter + 1);
      onCounterChange(counter + 1);
    }
  };

  const handleClickMinus = async () => {
    if (counter > 1) {
      setCounter(counter - 1);
      onCounterChange(counter - 1);
    }
  };

  return (
    <Typography align="center" variant="body2" color="text.secondary" sx={{marginBlock: 3, marginInline: 'auto', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '40%', minWidth: 80 }}>
      <ButtonBase
        onClick={handleClickPlus}
      >
        <AddCircleIcon sx={{color: "#8FBFCC", fontSize: 25}}/>
      </ButtonBase>
      {counter}
      <ButtonBase
        onClick={handleClickMinus}
      >
        <RemoveCircleIcon sx={{color: "#8FBFCC", fontSize: 25}}/>
      </ButtonBase>
    </Typography>
  );
}
