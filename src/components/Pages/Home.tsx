import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>Home</div>
      <div>helo</div>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};

export default Home;

// const navigate = useNavigate();
// const logOut = () => {
//   // dispatch(clearTokens());
//   // localStorage.removeItem("user");
//   navigate("/login");
//   window.location.reload();
