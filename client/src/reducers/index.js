import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
import eventsReducer from "./eventsReducer.js";
import doughnutReducer from "./doughnutReducer.js";
import lineReducer from "./lineReducer.js";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  events: eventsReducer,
  doughut: doughnutReducer,
  line: lineReducer

});
