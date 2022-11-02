import "./Loader.css";
import { useSelector } from "react-redux";

const Loader = (props) => {
  const { loading } = useSelector((state) => state.user);
  return (
    <div class="lds-dual-ring">
      <div>loading...</div>
    </div>
  );
};

export default Loader;
