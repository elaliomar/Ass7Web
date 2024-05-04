import { Outlet } from "react-router-dom";
import CustomHeader from "../organisms/CustomHeader";
import "../../styles/Layout.css";
import CustomFooter from "../atoms/CustomFooter";

const Layout = () => {
  return (
    <div className="custom-app">
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </div>
  );
};

export default Layout;
