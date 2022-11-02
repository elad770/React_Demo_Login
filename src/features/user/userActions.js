import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const host_api = "https://quickclearapi1.onrender.com";
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods":
          //   "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
      };

      // const { data } = await fetch(
      //   "https://quickclearapi1.onrender.com/login",
      //   {
      //     method: "post",
      //     config,
      //     //make sure to serialize your JSON body
      //     body: JSON.stringify({
      //       email: email,
      //       password: password,
      //     }),
      //   }
      // );

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
      //console.log("Data is... user email", user.userInfo);
      const { data } = await axios({
        method: "GET",
        url: "https://quickclearapi1.onrender.com/profile",
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
        //email: user.userInfo.email,
      });

      //   const { data } = await axios.get(
      //     `/profile`,
      //     // { email: user.email },
      //     {
      //         headers: {
      //         Authorization: `Bearer ${user.userToken}`,
      //       },
      //     }
      //   );
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
