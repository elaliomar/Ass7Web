import Home from "./components/Pages/Home";
import LogIn from "./components/Pages/LogIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { setAccessToken } from "./redux/slices/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }
  });
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

{
  /* <Link to="/">Home</Link>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<LogIn />} />
  <Route path="/register" element={<SignUp />} />
</Routes> */
}
// const dispatch = useDispatch();
// const token = useSelector((state: RootState) => state.auth.accessToken);
// const accessToken = localStorage.getItem("accessToken");
// useEffect(() => {
//   if (accessToken) {
//     dispatch(setAccessToken(accessToken));
//   }
// }, [accessToken, token]);
