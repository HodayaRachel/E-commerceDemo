const customerDAL = require("../DAL/customerDAL");

async function getAllCustomers() {
  const { data } = await customerDAL.getAllCustomers();
  const finalData = await Promise.all(
    data.map(async (customer) => {
      return await formatingCustomer(customer);
    })
  );
  return finalData;
}

async function getCustomerById(id) {
  const { data } = await customerDAL.getCustomerById(id);
  const finalData = await formatingCustomer(data);
  return finalData;
}

async function getCustomerByEmail(email) {
  const { data } = await customerDAL.getCustomerByEmail(email);
  const finalData = await formatingCustomer(data[0]);
  return finalData;
}

async function formatingCustomer(customer) {
  const finalCustomer = {};
  
  finalCustomer.id = customer.id;
  finalCustomer.name = customer.name;
  finalCustomer.email = customer.email;
  finalCustomer.city = customer.address.city;

  return finalCustomer;
}

module.exports = { getAllCustomers, getCustomerById, getCustomerByEmail };
