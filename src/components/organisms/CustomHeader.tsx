import { Link } from "react-router-dom";
import { clearTokens } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const CustomHeader = () => {
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(clearTokens());
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-lg">
        <Link className="navbar-brand text-light" to="/news">
          News24
        </Link>
        <button
          className="navbar-toggler text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link  text-light"
                aria-current="page"
                to="/news"
              >
                News
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu ">
                <li>
                  <button className="dropdown-item" onClick={LogOut}>
                    LogOut
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomHeader;
