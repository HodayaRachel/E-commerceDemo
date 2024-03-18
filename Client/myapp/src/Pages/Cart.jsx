import React, { useState, Fragment, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import TotalPriceComp from "../Components/TotalPriceComp";
import { useDispatch } from "react-redux";
import CartTableRow from "../Components/CartTableRow";

export default function Cart() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const [select, setSelect] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [changeQty, setChangeQty] = useState(false);

  const handleSelectClick = (e, id) => {
    if (e === false) {
      const newSelected = select.filter((pro) => pro.product._id !== id);
      setSelect(newSelected);
    } else {
      const product = products.find((pro) => pro.product._id === id);
      setSelect([...select, product]);
    }
  };

  const handleClickDelete = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    setDeleteProduct(true);
  };

  useEffect(() => {
    setDeleteProduct(false);
  }, [deleteProduct]);

  useEffect(() => {
    setChangeQty(false);
  }, [changeQty]);

  return (
    <Fragment>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{
          marginTop: 5,
          marginBottom: 3,
          color: "#5f6668",
          textShadow: "2px 2px 4px #60A2B5",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: 35,
        }}
      >
        My Cart
      </Typography>
      {products.length > 0 ? (
        <Fragment>
          <TableContainer
            sx={{
              display: "flex",
              flexDirection: { lg: "row-reverse", xs: "column", md: "column" },
              justifyContent: "space-between",
              width: "90vw",
              marginInline: "auto",
            }}
          >
            <Table
              stickyHeader
              aria-label="collapsible table"
              sx={{
                maxHeight: 600,
                minWidth: { xs: "100px", md: "60vw" },
                width: "auto",
                marginTop: 3,
                marginBottom: 3,
                borderRadius: 3,
              }}
              component={Paper}
            >
              <TableBody>
                {products.map((product) => (
                  <CartTableRow
                    product={product}
                    onDelete={handleClickDelete}
                    onSelect={handleSelectClick}
                    onChangeQtyFunc={setChangeQty}
                  />
                ))}
              </TableBody>
            </Table>
              <TotalPriceComp items={select} />
          </TableContainer>
        </Fragment>
      ) : (
        <h2 style={{ textAlign: "center", color: "#5f6668" }}>
          your cart is empty
        </h2>
      )}
    </Fragment>
  );
}
