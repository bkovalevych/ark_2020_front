import { createStore, applyMiddleware, compose } from "redux";
import createSageMiddleware from "redux-saga";
import get from "lodash/get";
import rootSaga from "./sagas";
import reducers from "./reducers";

const sagaMiddleware = createSageMiddleware();

const composeEnhancers =
    get(global, "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", false) || compose;

const middlewares = composeEnhancers(applyMiddleware(sagaMiddleware));

export default function initStore(initialState = {}) {
  const store = createStore(reducers, initialState, middlewares);

  sagaMiddleware.run(rootSaga);

  return store;
}
