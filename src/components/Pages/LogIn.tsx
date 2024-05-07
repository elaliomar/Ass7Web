import "../../styles/auth.css";
import CustomInput from "../molecules/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { UserCredentials } from "../../types/userCredientials";
import { useDispatch } from "react-redux";
import handleApiResponseError from "../../utils/authErrorHandle";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { setAccessToken, setRefreshToken } from "../../redux/slices/authSlice";
import { apiURL } from "../../utils/apiURL";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleFormSubmit = async (
    values: UserCredentials,
    formikHelpers: FormikHelpers<{
      email: string;
      password: string;
    }>
  ) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setRefreshToken(response.data.refreshToken));
        navigate("/");
      }
    } catch (error) {
      handleApiResponseError(error as AxiosError, "login");
      console.log(error);
    } finally {
      setIsLoading(false);
      formikHelpers.resetForm();
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 left-box rounded-4 d-flex justify-content-center align-items-center flex-column bg-primary">
          <div className="featured-image mb-3">
            <img
              src="src/assets/news.jpg"
              className="img-fluid rounded"
              style={{ width: "250px", objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h5 className="text-center">Happy to have you back</h5>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ handleChange, handleSubmit, values, errors }) => (
                  <>
                    <CustomInput
                      type="text"
                      name="Email"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                    <CustomInput
                      type="password"
                      name="Password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange("password")}
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password}</p>
                    )}
                    <div className="text-center">
                      {isLoading ? (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <CustomButton title="LogIn" onClick={handleSubmit} />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Formik>
              <div className="signin mt-2 d-flex flex-row justify-content-center">
                <span>
                  Don't have an account? <Link to="/signup">Sign Up here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
