import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Profile(props) {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  setInterval(() => {
    console.log("Home");
    props.remove();
  }, 10000);
  function getData() {
    axios({
      method: "GET",
      url: "/profile",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;

        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });

        //console.log("dddddfds");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.statusText === "UNAUTHORIZED") {
            //console.log("asSSA", props.removeToken);
            console.log("fxxxxfff");
            props.remove();
            navigate(-1);
          }
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  //   if (err !== "UNAUTHORIZED") {
  //     console.log("dddd", profileData);
  //     navigate(-1);
  //     console.log("xxxxxxx", profileData);
  //   }
  return (
    <div className="Profile">
      <p>To get your profile details: </p>
      <button onClick={getData}>Click me</button>
      {profileData ? (
        <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
