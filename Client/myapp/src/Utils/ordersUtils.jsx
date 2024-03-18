import axios from "axios";

const url = "http://localhost:8000/orders"

const getAllOrders = async() => {
    const {data} = await axios.get(url)
    console.log(data)
    return data
}

const getOrderById = async(id) => {
    const {data} = await axios.get(`${url}/${id}`)
    return data
}

const addOrder = async(order) => {
    const {data} = await axios.post(url, order)
    return data
}

export {getAllOrders, getOrderById, addOrder}
