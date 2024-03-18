import { saveState } from "./Utils/localStoregeUtils";

function appReducer( state = { qtyItemsInCart: 0, products: [], totalPrice: 0 }, action ) {

  switch (action.type) {

    case "ADD_TO_CART":

      const index = state.products.findIndex(
        (p) => p.product._id === action.payload.Product._id
      );

      if (index !== -1) {
        state.products[index].qty += action.payload.Quantity;
      } else {
        state.products = [
          ...state.products,
          { product: action.payload.Product, qty: action.payload.Quantity },
        ]
      }
      state.totalPrice += action.payload.Price;
      state.qtyItemsInCart += action.payload.Quantity;

      saveState(state);
      return { ...state };

    case "REMOVE_FROM_CART":
      const indexToRemove = state.products.findIndex(
        (p) => p.product._id === action.payload
      );

      if (indexToRemove !== -1) {
        console.log("index to remove", state.products[indexToRemove]);

        const removedProduct = state.products[indexToRemove];
        state.qtyItemsInCart -= removedProduct.qty;
        state.products.splice(indexToRemove, 1);
        state.totalPrice -= action.payload.Price;
      }
      saveState(state);
      return { ...state };

    case "INCREMENT_ITEM_FROM_CART":
      const indexToIncrement = state.products.findIndex(
        (p) => p.product._id === action.payload.productId
      );

      if (indexToIncrement !== -1) {

        state.products[indexToIncrement].qty += 1;
        state.qtyItemsInCart += 1;
        state.totalPrice += action.payload.Price;

        console.log("state", state);
      }
      saveState(state);

      return { ...state };

    case "DECREMENT_ITEM_FROM_CART":
      const indexToDecrement = state.products.findIndex(
        (p) => p.product._id === action.payload.productId
      );

      if (indexToDecrement !== -1) {

        state.products[indexToDecrement].qty -= 1;
        state.qtyItemsInCart -= 1;
        state.totalPrice -= action.payload.Price;

        console.log("state", state);
      }

      saveState(state);

      return { ...state };

    default:
      return state;
  }
}

export default appReducer;
