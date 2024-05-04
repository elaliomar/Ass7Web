import Home from "./components/Pages/News";
import LogIn from "./components/Pages/LogIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAccessToken } from "./redux/slices/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./components/molecules/NotFound";
import Layout from "./components/Layout/Layout";
import Details from "./components/Pages/Details";
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
          <Route element={<Layout />}>
            <Route
              path="/news"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<Layout />}>
            <Route
              path="/news/:newsId"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
