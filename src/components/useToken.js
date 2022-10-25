import { useState } from "react";

function useToken() {
  function getToken() {
    const userToken = localStorage.getItem("token");
    return userToken && userToken;
  }

  const [token, setToken] = useState(getToken());
  function saveToken(userToken) {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  }

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
    window.location.replace("http://localhost:3000/");
    //window.location.href = "http://localhost:3000/";
    // window.location.replace(...) is better than using window.location.href

    //navigate(-1);
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}

export default useToken;
