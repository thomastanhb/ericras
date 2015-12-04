// import __ from 'underscore';

// const LOAD = 'redux-example/LOAD_CART';
// const LOAD_SUCCESS = 'redux-example/LOAD_CART_SUCCESS';
// const LOAD_FAIL = 'redux-example/LOAD_CART_FAIL';
const ADD_TO_CART = 'redux-example/ADD_TO_CART';
const REMOVE_FROM_CART = 'redux-example/REMOVE_FROM_CART';
const UPDATE_CART_VISIBLE = 'redux-example/UPDATE_CART_VISIBLE';
const TEST_BUTTON = 'redux-example/TEST_BUTTON';

const initialState = {
  products: {},
  isCartVisible: false,
  total: '0.00'
};

function log(name, value1 = '--', value2 = '--', value3 = '--') {
  console.log('hbCart: ' + name + ', ' + value1 + ', ' + value2 + ', ' + value3);
}

function updateProducts(state = initialState.products, action) {
  // action.sku, action.item
  const sku = action.sku;
  const item = action.item;
  log('item xxx', action.item, item, state[sku]);
  item.quantity = state[sku] === undefined ? 1 : state[sku].quantity + 1;
  const newProducts = {
    ...state,
    [sku]: item
  };
  // initialState.total = getCartTotal(newProducts);
  return newProducts;
}

function getCartTotal(state = initialState.products, action) {
  const newProducts = updateProducts(state, action);

  let total = 0;
  let product;
  for (product in newProducts) {
    if (newProducts.hasOwnProperty(product)) {
      total += newProducts[product].price * newProducts[product].quantity;
    }
  }
  log('total xxx', total, newProducts);
  return total.toFixed(2).toString();
}

export default function hbCart(state = initialState, action = {}) {
  switch (action.type) {
    case REMOVE_FROM_CART:
      return {
        ...state,
        loading: true
      };
    case UPDATE_CART_VISIBLE:
      return {
        ...state,
        isCartVisible: true,
        data: action.result
      };
    case ADD_TO_CART:
      return {
        ...state,
        products: updateProducts(state.products, action),
        total: getCartTotal(state.products, action)
      };
    case TEST_BUTTON:
      log('TEST_BUTTON state.isCartVisible', state.isCartVisible);
      return {
        ...state,
        isCartVisible: !state.isCartVisible
      };
    default:
      return state;
  }
}

export function addToCart(sku, item) {
  // log('addToCart sku item', sku, item);
  return {
    type: ADD_TO_CART,
    sku: sku,
    item: item
  };
}

export function testButton() {
  log('testButton');
  return {
    type: TEST_BUTTON
  };
}

