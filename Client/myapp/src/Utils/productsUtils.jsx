import axios from "axios"

const url = "http://localhost:8000/products"

const getAllProducts = async() => {
    const {data} = await axios.get(url)
    return data
}

const getProductById = async(id) => {
    const {data} = await axios.get(`${url}/${id}`)
    return data
}

const addNewProduct = async(product) => {
    const {data} = await axios.post(url, product)
    return data
}

export { getAllProducts, getProductById, addNewProduct }