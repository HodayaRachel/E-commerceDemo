import React, { useEffect, useState } from "react";
import { getAllProducts } from "../Utils/productsUtils";
import ProductComp from "../Components/ProductComp";
import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import DialogAddNewProduct from "../Components/DialogAddNewProduct";

export default function ProductsPage() {

  const [allProducts, setAllProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const fetchData = async () => {
    try {
      const { products } = await getAllProducts();
      setAllProducts(products);
    } catch (error) {
      console.log("Error fething products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    setIsAddingProduct(false)
  }, [isAddingProduct]);


  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{
          marginTop: 10,
          marginBottom: 10,
          color: "#5f6668",
          textShadow: "2px 2px 4px #60A2B5",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: 35,
        }}
      >
        מארזי מתנה - מארזי שוקולד
      </Typography>
      <Masonry
        // margin={'auto'}
        // className="masonry_products"
        columns={{ xs: 1, sm: 1, md: 2, lg: 3}}
        spacing={{ lg: 15}}
        sx={{ display: 'ruby', margin: 'auto', /*alignContent: 'center', display: { md: 'flex', xs: 'flex'}, alignContent: {lg:'flex-end', md:"center", xs:"center"}, marginInline: {md:'auto', lg: 0}, display: 'flex',*/ flexDirection: 'column', flexWrap: 'wrap',
        '@media (min-width: 1200px)': {margin: 0},
        // '@media (min-width: 1200px)': {margin: 0}
        }}
      >
        {allProducts.map((product) => (
          <ProductComp key={product._id} product={product} />
        ))}
      </Masonry>
        <DialogAddNewProduct setIsAddingProduct={setIsAddingProduct}/>
    </>
  );
}
