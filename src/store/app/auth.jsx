import { createSlice } from "@reduxjs/toolkit";
// import { API_CONFIG } from "../../../config";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_CONFIG } from "../../config";

const initialState = {
  access_token: null,
  expires_in: null,
  scope: null,
  authorities: [],
  error: null,
  changePasswordSuccess: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setAuthorities: (state, action) => {
      state.authorities = action.payload;
    },
    authorize: (state, action) => {
      state.access_token = action.payload.token;
      // Decode the String
      const decodedJwt = jwtDecode(action.payload.token);

      // const decodedJwt = jwt.decode(action.payload.jwt);
      state.expires_in = decodedJwt.exp * 1000;
      state.authorities = action.payload.authorities;
      state.userInfo = action.payload;
      state.error = null;
    },
    signOut: (state) => {
      state.access_token = null;
      state.type = null;
      state.userInfo = null;
      state = {};
      localStorage.clear();
      sessionStorage.clear();
      const Cookies = document.cookie.split(";");
      for (let i = 0; i < Cookies.length; i++) {
        document.cookie =
          Cookies[i] + "=; expires=" + new Date(0).toUTCString();
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAccessToken, setAuthorities, signOut, setError, authorize } =
  authSlice.actions;

export const login = (payload) => async (dispatch) => {
  try {
    console.log("Pay:", payload);
    const response = await axios.post(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.AUTHORIZE_API_URL}`,
      payload
    );
    console.log(response.data);

    dispatch(authorize(response.data));
    return response.data;
  } catch (error) {
    dispatch(setError("Invalid Email or Password"));
    console.error(error);
  }
};

export const register = (payload) => async (dispatch) => {
  try {
    console.log("payload:", payload);
    const response = await axios.post(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.REGISTER_API_URL}`,
      payload
    );
    // dispatch(authorize(response.data));
  } catch (error) {
    console.error(error);
  }
};

export default authSlice.reducer;
