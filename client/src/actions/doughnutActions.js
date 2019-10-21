import axios from "axios";
import { LOG_LIST_LOADED, LOG_LOAD_FAIL } from "../actions/types";
import { returnErrors } from "./errorActions";

// load logs from database

export const loadLogs = () => dispatch => {
  axios
    .get("api/logs/5d98d50d96ba210da4c0e3b0")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: LOG_LIST_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, "LOG_LOAD_FAIL"));
      dispatch({ type: LOG_LOAD_FAIL });
    });
};
