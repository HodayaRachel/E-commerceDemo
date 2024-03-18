import React, { useState, Fragment, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getAllOrders } from "../Utils/ordersUtils";
import CartTableRow from "../Components/CartTableRow";
import Pagination from "../Components/Pagination";


export default function OrderPage() {

  const [allOrders, setAllOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  const [expandedRows, setExpandedRows] = useState(() => {
    const initialState = {}
    allOrders.forEach((order) => {
      initialState[order._id] = false;
    });
    return initialState;
  });

  const handleExpandClick = (orderId) => {
    setExpandedRows((prevExpandedRows) => {
      const newState = { ...prevExpandedRows };
        Object.keys(newState).forEach((key) => {
        if (key !== orderId) {
          newState[key] = false;
        }
      });
      newState[orderId] = !prevExpandedRows[orderId];
      return newState;
    });
  };

  const fetchData = async() => {
    try {
      const {orders} = await getAllOrders();
      setAllOrders(orders);
    } catch (error) {
      console.log("Error fething products:", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])


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
        All Orders
      </Typography>
    <TableContainer
      sx={{ minWidth: { sm: "100px", md: "47vw" }, maxWidth: 650, paddingInline: {md: '10px'}, display: 'flex', marginInline: 'auto', borderRadius: 3, flexDirection: 'column', marginBottom: 15 }}
      component={Paper}
    >
      <Table stickyHeader aria-label="collapsible table"
      sx={{
        maxHeight: 600,
        width: 'max-content',
        minWidth: {sm: 450, md: 650},
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 3,
        paddingTop: 3,
        marginInline: 'auto'
      }}
      >
        <TableHead>
          <TableRow sx={{borderRadius: 3}}>
            <TableCell sx={{ textAlign: "center", color: "#60A2B5", fontSize: {xs: 'xx-small', sm: 'small', md: 20}, padding: {xs: 0, sm: 2} }}/>
            <TableCell sx={{ textAlign: "center", color: "#60A2B5", fontSize: {xs: 'xx-small', sm: 'small', md: 20}, padding: {xs: 0, sm: 2} }}>Order Code</TableCell>
            <TableCell sx={{ textAlign: "center", color: "#60A2B5", fontSize: {xs: 'xx-small', sm: 'small', md: 20}, padding: {xs: 0, sm: 2} }}>TotalPrice</TableCell>
          </TableRow> 
        </TableHead>
        <TableBody>
          {currentOrders.map((order) => (
            <Fragment key={order._id}>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell sx={{padding: {xs: 0, sm: 2}}}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleExpandClick(order._id)}
                  >
                    {expandedRows[order._id] ? (
                      <ExpandLessIcon fontSize="small" sx={{color: "#60A2B5"}}/>
                    ) : (
                      <ExpandMoreIcon fontSize="small" sx={{color: "#60A2B5"}}/>
                    )}
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", color: "#60A2B5", fontSize: {xs: 'xx-small', sm: 'small'}, padding: {xs: 0, sm: 2} }}
                  component="th"
                  scope="row"
                >
                  {order._id}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", color: "#60A2B5", fontSize: {xs: 'xx-small', sm: 'small'}, padding: {xs: 0, sm: 2} }}
                  component="th"
                  scope="row"
                >
                 $ {order.TotalPrice}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ padding: 0 }}
                  colSpan={6}
                >
                  <Collapse
                    in={expandedRows[order._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={{ margin: {md: 1, xs: 0} }}>
                      {order.Products.map((productInOrder) => (
                        <CartTableRow product={productInOrder} onDelete={false}/>
                      ))}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
    </TableContainer>
    </Fragment>

  );
}
