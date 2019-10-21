import axios from "axios";
import { EVENT_LIST_LOADED, EVENT_LOAD_FAIL } from "../actions/types";
import { returnErrors } from "./errorActions";

// load list of events from database

export const loadList = () => dispatch => {
  axios
    .get("api/events")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: EVENT_LIST_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, "EVENT_LOAD_FAIL"));
      dispatch({ type: EVENT_LOAD_FAIL });
    });
};
