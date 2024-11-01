const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// Correct initial state for cakes and ice creams
const cakeInitialState = {
  numOfCakes: 10,
};

const icecreamInitialState = {
  numOfIcecreams: 20,
};

// Correct cake reducer to use numOfCakes
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

// Ice cream reducer remains unchanged
const icecreamReducer = (state = icecreamInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };

    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };
    default:
      return state;
  }
};

// Root reducer combining both cake and ice cream reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state:", store.getState());

const unsubscribe = store.subscribe(() => {});

// Binding action creators for convenience
const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);

// Dispatching actions to see the log outputs
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(10);
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(2);

unsubscribe();
