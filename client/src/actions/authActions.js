import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";
import { returnErrors } from "./errorActions";

// check token and load user

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const config = tokenConfig(getState);

  axios
    .get("/api/auth/user", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// register user

export const register = ({ name, email, password, zipcode }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // request body

  const body = JSON.stringify({ name, email, password, zipcode });

  axios
    .post("api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// logout user

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// login user

export const login = ({ email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // request body
  const body = JSON.stringify({
    email,
    password
  });
  axios
    .post("api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

//check token

export const tokenConfig = getState => {
  // get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
