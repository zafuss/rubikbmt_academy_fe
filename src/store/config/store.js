import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

const { default: rootReducer } = require("../reducers/rootReducer");

// @ts-ignore
// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myLogger = (store) => (next) => (action) => {
  console.log("Logged action: ", action);
  next(action);
};

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(myLogger, thunk))
);

export default store;
