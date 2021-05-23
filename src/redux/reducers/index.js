import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user";
import topics from "./topics"
import steps from "./steps"

const reducers = combineReducers({
  router: routerReducer,
  user,
  topics,
  steps
});

export default reducers;
