const LOAD = 'redux-example/LOAD_PRODS';
const LOAD_SUCCESS = 'redux-example/LOAD_PRODS_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_PRODS_FAIL';
const SELECT_VARIANT = 'redux-example/SELECT_VARIANT';

const initialState = {
  loaded: false,
  selectedIndex: 0
};

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
      console.log('action.index ' + action.index);
      return {
        ...state,
        selectedIndex: parseInt(action.index, 10)
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.hbProducts && globalState.hbProducts.loaded;
}

export function load() {
  console.log('load xxx');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/hbAPIProducts')
  };
}

export function selectVariant(event) {
  console.log('selectVariant ' + event.target.value);
  return {
    type: SELECT_VARIANT,
    index: event.target.value
  };
}
