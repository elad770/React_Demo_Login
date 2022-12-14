import { useSelector } from "react-redux";
import "../styles/profile.css";
import { useEffect } from "react";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    let elementFigure = document.querySelector("figure");
    if (elementFigure) {
      // let colors1 = [
      //   "red",
      //   "blue",
      //   "green",
      //   "teal",
      //   "tan",
      //   "plum",
      //   "chocolate",
      // ];
      // let colors2 = [
      //   "red",
      //   "blue",
      //   "green",
      //   "teal",
      //   "tan",
      //   "plum",
      //   "chocolate",
      // ];

      let color1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
      let color2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
      let color3 = "#" + Math.floor(Math.random() * 16777215).toString(16);
      //alert(" 1 " + color1 + " 2 " + color2 + " 3 " + color3);
      elementFigure.style.backgroundImage = `linear-gradient(to right, ${color1}, ${color2},${color3} )`;
      // document.querySelector(
      //   "figure"
      // ).style.backgroundImage = `linear-gradient(to right, ${
      //   colors1[Math.floor(Math.random() * colors1.length)]
      // }, ${colors2[Math.floor(Math.random() * colors2.length)]} )`;
    }
  }, []);

  //console.log("userInfo", userInfo.email);
  return (
    <div>
      {/* {userInfo?.name
        ? <figure>{userInfo.name.charAt(0).toUpperCase()}</figure> && (
            <span>
              Welcome <strong>{userInfo?.name}! phone this is:</strong>{" "}
              {userInfo?.phone}
            </span>
          )
        : ""} */}
      <figure>
        {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : ""}
      </figure>
      <span>
        Welcome <strong>{userInfo?.name}! phone this is:</strong>{" "}
        {userInfo?.phone}
      </span>
    </div>
  );
};

export default ProfileScreen;
