import "./styles.css";
import { useState } from "react";
import CustomInput from "../atoms/CustomInput";
import { Link } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../../types/userCredientials";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";

const SignUp = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const navigate = useNavigate();
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
  // const handleFormSubmit = async (
  //   values: UserCredentials,
  //   formikHelpers: FormikHelpers<{
  //     email: string;
  //     password: string;
  //   }>
  // ) => {
  //   const userData = {
  //     email: values.email,
  //     password: values.password,
  //     token_expires_in: "30m",
  //   };
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "https://backend-practice.euriskomobility.me/signup",
  //       userData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.status === 201) {
  //       alert("User created successfully!");
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     handleApiResponseError(error as AxiosError, "signup");
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //     formikHelpers.resetForm();
  //   }
  // };
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
      token_expires_in: "30m",
    };
    dispatch(signUp(userData)).then(() => {
      formikHelpers.resetForm();
      navigate("/login");
    });
  };
  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          <div className="col-md-6 side-image">
            <div className="text">
              <p>
                News<i>24</i>
              </p>
            </div>
          </div>
          <div className="col-md-6 right">
            <div className="input-box">
              <header>Create account</header>
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
                    <div className="input-field">
                      {isLoading ? (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <CustomButton title="SignUp" onClick={handleSubmit} />
                      )}
                    </div>
                  </>
                )}
              </Formik>
              <div className="signin">
                <span>
                  Already have an account? <Link to="/login">Log in here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
