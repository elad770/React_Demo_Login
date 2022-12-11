import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/user/userActions";
// import { useEffect } from "react";
import Error from "../components/Error";

const LoginScreen = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  // useEffect(() => {
  //   if (userInfo) {
  //     //navigate("/profile");
  //   }
  // }, [navigate, userInfo]);

  const submitForm = (data) => {
    //const uslData = userLogin(data);
    dispatch(userLogin(data))
      .unwrap()
      .then((originalPromiseResult) => {
        navigate("/profile");
      });
    // .catch((rejectedValueOrSerializedError) => {
    //   // handle error here
    // });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && error !== "Username already exists" && <Error>{error}</Error>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register("email")}
          required
        />
      </div>
      <div>h</div>
      <div className="form-group">
        <label htmlFor="password">Password </label>
        <input
          type="password"
          className="form-input"
          {...register("password")}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        Login
      </button>
    </form>
  );
};

export default LoginScreen;
