import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
        "Password must contain at least one letter and one number"
      )
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/auth/login", values);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      toast.success(response?.data.message || "Login successful");
      navigate("/employee");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center shadow">
        <div className="col-lg-6 p-3">
          <img
            src="https://play-lh.googleusercontent.com/RvwSTOID8HN12_1nRCT5JlvHrcxXJGkep3CBWgjvY1A1ZaRQpe7FNNrs_LHIHRslPg"
            alt=""
          />
        </div>
        <div className="col-lg-6 bg-white p-5 rounded-5">
          <h4 className="mb-3">Login</h4>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    className="form-control my-3"
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off"
                    placeholder="Enter a name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div>
                  <Field
                    className="form-control my-3"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Enter an email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div>
                  <Field
                    className="form-control mt-3"
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Enter a password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="d-grid mt-5">
                  <button
                    type="submit"
                    className="btn btn-dark py-2"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default Login;
