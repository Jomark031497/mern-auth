import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../reducers/userTypes";
import axios from "axios";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const loginError = (err) => {
  return {
    type: LOGIN_ERROR,
    payload: err,
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());

      const { data } = await axios.post(
        "/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data);
      dispatch(loginSuccess(data.user));
    } catch (err) {
      dispatch(loginError(err.response.data.message));
    }
  };
};
