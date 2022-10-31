import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/login", { email, password }, config);

      // store user's token in local storage
      localStorage.setItem("userToken", data.access_token);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
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
        "/register",
        { name, email, password, phone, street, city, country, zip },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
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
        url: "/profile",
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
