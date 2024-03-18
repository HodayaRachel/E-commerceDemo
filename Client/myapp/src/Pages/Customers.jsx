import { useEffect, useState, Fragment } from "react";
import { getAllCustomers } from "../Utils/customersUtils";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Pagination from "../Components/Pagination";

export default function CustomersPage() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const fetchData = async () => {
    try {
      const { customers } = await getAllCustomers();
      setAllCustomers(customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = allCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(allCustomers.length / customersPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Fragment>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{
          marginTop: 7,
          marginBottom: 7,
          color: "#5f6668",
          textShadow: "2px 2px 4px #60A2B5",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: 35,
        }}
      >
        All Customers
      </Typography>
      <TableContainer
        sx={{
          minWidth: { xs: "100px", md: "60vw" },
          marginInline: {md: 'auto', xs: 0 },
          width: { xs: "100%" },
          maxWidth: {md: '100px', xs: "100%" },
          paddingInline: {md: '40px', sx: 0 },
          display: "flex",
          borderRadius: 3,
          flexDirection: "column",
        }}
        component={Paper}
      >
        <Table
          stickyHeader
          aria-label="collapsible table"
          sx={{
            backgroundColor: "#8fbfcc96",
            marginBottom: 3,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#5f6668",
                  textShadow: "2px 2px 4px #60A2B5",
                  fontFamily: "inherit",
                  fontWeight: 400,
                  fontSize: {lg: 25, xs: "small" },
                  paddingInline: { xs: 0 },
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#5f6668",
                  textShadow: "2px 2px 4px #60A2B5",
                  fontFamily: "inherit",
                  fontWeight: 400,
                  fontSize: {lg: 25, xs: "small" },
                  paddingInline: { xs: 0 },
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#5f6668",
                  textShadow: "2px 2px 4px #60A2B5",
                  fontFamily: "inherit",
                  fontWeight: 400,
                  fontSize: {lg: 25, xs: "small" },
                  // fontSize: 25,
                  paddingInline: { xs: 0 },
                }}
              >
                City
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCustomers.map((customer) => (
              <Fragment key={customer.id}>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      color: "white",
                      textShadow: "2px 2px 4px #60A2B5",
                      fontSize: { xs: "xx-small", md: 'smaller'},
                      paddingInline: { xs: 0 },
                      '@media (max-width: 300px)': {fontSize: '5px'}
                    }}
                    component="th"
                    scope="row"
                  >
                    {customer.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      color: "white",
                      textShadow: "2px 2px 4px #60A2B5",
                      fontSize: { xs: "xx-small", md: 'smaller'},
                      paddingInline: { xs: 0 },
                      '@media (max-width: 300px)': {fontSize: '5px'}
                    }}
                    component="th"
                    scope="row"
                  >
                    {customer.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      color: "white",
                      textShadow: "2px 2px 4px #60A2B5",
                      fontSize: { xs: "xx-small", md: 'smaller' },
                      paddingInline: { xs: 0 },
                      '@media (max-width: 300px)': {fontSize: '5px'}

                    }}
                    component="th"
                    scope="row"
                  >
                    {customer.city}
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </TableContainer>
    </Fragment>
  );
}
