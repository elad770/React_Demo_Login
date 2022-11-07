import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { registerUser } from "../features/user/userActions";

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to profile screen
    // if (userInfo) navigate("/profile");
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }

    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && error === "Username already exists" && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="form-group">
        <label htmlFor="name"> Name</label>
        <input
          type="text"
          className="form-input"
          {...register("name")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register("email")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register("password")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register("confirmPassword")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">zip</label>
        <input
          type="text"
          className="form-input"
          {...register("zip")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">phone</label>
        <input
          type="text"
          className="form-input"
          {...register("phone")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="street">street</label>
        <input
          type="text"
          className="form-input"
          {...register("street")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">city</label>
        <input
          type="text"
          className="form-input"
          {...register("city")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">country</label>
        <input
          type="text"
          className="form-input"
          {...register("country")}
          required
        />
      </div>
      {/* name, email, password,phone,street,city,country,zip */}
      <button type="submit" className="button" disabled={loading}>
        Register
      </button>
    </form>
  );
};

export default RegisterScreen;
