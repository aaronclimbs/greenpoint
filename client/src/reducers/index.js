import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
import eventsReducer from "./eventsReducer.js";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
 events: eventsReducer
});
