const productModel = require('../models/productModel')
const UUID = require('uuid-int');


async function getAllProducts() {
    const products = await productModel.find({})
    return products
}

async function getProductById(id) {
    const product = await productModel.findById(id)
    return product    
}

async function addProduct(product) {
    product.Code = await codeToProduct()
    console.log(product)
    const newProduct = new productModel(product)
    await newProduct.save()
    return 'created'    
}

async function updateProduct(id, product) {
    await productModel.findByIdAndUpdate(id, product)
    return 'updated'    
}

async function deleteProduct(id) {
    await productModel.findByIdAndDelete(id)
    return 'deleted'    
}

async function codeToProduct() {
    const id = 0;
    const generator = UUID(id);
    const code = generator.uuid();
    return code
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct }

