const LOAD = 'redux-example/LOAD_PRODS';
const LOAD_SUCCESS = 'redux-example/LOAD_PRODS_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_PRODS_FAIL';
const SELECT_VARIANT = 'redux-example/SELECT_VARIANT';
const ADD_TO_CART = 'redux-example/ADD_TO_CART';

const initialState = {
  loaded: false,
  selectedIndex: 0
};

function log(name, value1 = '--', value2 = '--', value3 = '--') {
  console.log('hbProducts: ' + name + ', ' + value1 + ', ' + value2 + ', ' + value3);
}

export default function hbProducts(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SELECT_VARIANT:
      log('SELECT_VARIANT action.index', action.index);
      return {
        ...state,
        selectedIndex: parseInt(action.index, 10)
      };
    case ADD_TO_CART:
      log('ADD_TO_CART in reducer', action.sku);
      log('ADD_TO_CART in reducer', action.update);
      return {
        ...state,
        sku: action.sku,
        update: action.update
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.hbProducts && globalState.hbProducts.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/hbAPIProducts')
  };
}

export function selectVariant(event) {
  log('selectVariant', event.target.value);
  return {
    type: SELECT_VARIANT,
    index: event.target.value
  };
}

export function addToCart(sku, update) {
  // console.log('addToCart ' + sku);
  // console.log('addToCart ' + update);
  return {
    type: ADD_TO_CART,
    sku: sku,
    update: update
  };
}
