import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { trackPromise } from 'react-promise-tracker';
const host_api = "http://127.0.0.1:5000/users"; //"https://quickclearapi3.onrender.com";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${host_api}/login`,
        { email, password },
        config
      );

      // store user's token in local storage
      console.log("data = ", data);
      localStorage.setItem("userToken", data.access_token);
      return data;
    } catch (error) {
      //error.response.data.msg msg is name key in json backend
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { name, email, password, phone, street, city, country, zip },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${host_api}/register`,
        { name, email, password, phone, street, city, country, zip },
        config
      );
    } catch (error) {
      alert(error.response.data.msg);
      if (error.response && error.response.data.msg) {
        alert(error.response.data.msg);
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store

      const { user } = getState();

      // alert(user.userToken);
      let config = {
        headers: {
          "Content-Type": "application/json",
          //Accept: "application/json",
          //"Access-Control-Allow-Headers": true,
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.userToken}`,
        },
        // params: {
        //   email: user.userInfo.email,
        // },
      };

      const { data } = await axios.get(`${host_api}/user`, config);
      //localStorage.setItem("userToken", data.access_token);
      console.log("data after is", data);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
