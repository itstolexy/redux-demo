const redux = require("redux");
const produce = require('imer'
  
).produce;

const initialState = {
  name: "Tola",
  address: {
    street: "Lagos",
    city: "Ibadan",
    state: "Challenge",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log("Intial State", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});
store.dispatch(updateStreet("Orita"));
unsubscribe();
