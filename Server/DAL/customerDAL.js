const axios = require('axios')
const url = "https://jsonplaceholder.typicode.com/users"


const getAllCustomers = () => {
    return axios.get(url)
}

const getCustomerById = (id) => {
    return axios.get(`${url}/${id}`)
}

const getCustomerByEmail = (email) => {
    return axios.get(`${url}/?email=${email}`)
}

module.exports = { getAllCustomers, getCustomerById, getCustomerByEmail }