const orderModel = require("../models/orderModel");
const productBLL = require("./productBLL");


async function getAllOrders() {
  const orders = await orderModel.find({});

  const finalOrders = await Promise.all(
    orders.map(async (order) => {
      const finalOrder = await formmatingToOrder(order);
      return finalOrder;
    })
  );
  return finalOrders;
}

async function getOrderById(id) {
  const order = await orderModel.findById(id);
  const finalOrder = await formmatingToOrder(order);
  return finalOrder;
}

async function addOrder(order) {
  const newOrder = new orderModel(order);
  await newOrder.save();
  return "created";
}

async function updateOrder(id, order) {
  await orderModel.findByIdAndUpdate(id, order);
  return "updated";
}

async function deleteOrder(id) {
  await orderModel.findByIdAndDelete(id);
  return "deleted";
}

async function formmatingToOrder(order) {
  const productsWithDetails = await Promise.all(
    order.Products.map(async (product) => {
      const productDetails = await productBLL.getProductById(product.ProductID);

      const finalProduct = {
        product: productDetails,
        qty: product.Quantity,
      };

      return finalProduct;
    })
  );

  const finalOrder = {};
  finalOrder.Products = productsWithDetails;
  finalOrder.TotalPrice = order.TotalPrice;
  finalOrder._id = order._id;

  return finalOrder;
}

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
};
