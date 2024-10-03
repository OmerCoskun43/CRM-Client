import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuthCalls from "../../service/useAuthCalls";
import { notifyError } from "../../helper/HotToast";

const Login = () => {
  const navigate = useNavigate();
  const { loginSuccess, loginWithGoogle, resetPassword } = useAuthCalls();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    loginSuccess(values);
  };

  const handleClick = (email) => {
    if (!email) {
      notifyError("Email is required");
    } else {
      resetPassword(email);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-6 border border-gray-300 rounded-lg bg-blue-100 shadow">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="font-montserrat text-label text-labelColor hover:cursor-pointer hover:after:content-['omer@omer.com'] hover:after:text-black hover:after:pl-3 hover:after:underline"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 rounded p-2 w-full peer focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="">
                <p
                  className="text-red-600 text-end font-bold hover:underline hover:underline-decoration-red-800 cursor-pointer"
                  onClick={() => handleClick(values.email)}
                >
                  Reset Password
                </p>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-montserrat text-label text-labelColor hover:cursor-pointer hover:after:content-['Omer123!'] hover:after:text-black hover:after:pl-3 hover:after:underline"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded py-2 font-bold px-4 hover:bg-blue-500 w-[10rem]"
              >
                Log In
              </button>
              <div className="flex flex-col items-end">
                <p>Do you have not an account?</p>
                <span
                  onClick={() => navigate("/register")}
                  className="text-red-600 cursor-pointer hover:underline font-bold"
                >
                  Register
                </span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <button
          onClick={() => loginWithGoogle()}
          className="bg-green-600 w-full flex justify-between items-center text-white rounded py-2 font-bold px-4 hover:bg-green-500"
        >
          Login with Google{" "}
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="ggl"
            className="w-12 h-12 bg-white rounded-full p-1"
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
