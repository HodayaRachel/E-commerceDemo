import axios from "axios";

const url = "http://localhost:8000/customers"

const getAllCustomers = async() => {
    const {data} = await axios.get(url)
    return data
}

export { getAllCustomers }