/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuthCalls from "../../service/useAuthCalls";
import { useSelector } from "react-redux";
import useCrmCalls from "../../service/useCrmCalls";

const Register = () => {
  const navigate = useNavigate();
  const { fetchData } = useCrmCalls();
  const { registerSuccess, loginWithGoogle } = useAuthCalls();
  const [profilePic, setProfilePic] = useState(null);
  const { departments } = useSelector((state) => state.crm);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    departmentId: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
    departmentId: Yup.string().required("Department ID is required"),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("departmentId", values.departmentId);
    formData.append("profilePic", profilePic); // Append the file

    registerSuccess(formData);
  };

  const handleFileChange = (event) => {
    setProfilePic(event.currentTarget.files[0]);
  };

  const handleRemoveFile = () => {
    setProfilePic(null);
    // Sıfırlama işlemi
    document.getElementById("profilePic").value = "";
  };

  useEffect(() => {
    fetchData("departments");
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 mb-8 p-6 border border-gray-300 rounded-lg bg-blue-100  shadow">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="mb-2">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="departmentId" className="block mb-2">
                Department
              </label>
              <Field
                as="select"
                id="departmentId"
                name="departmentId"
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option disabled value="">
                  Select A Department
                </option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="departmentId"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profilePic" className="block mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="border bg-white border-gray-300 rounded p-2 w-full"
              />
              {profilePic && (
                <div className="mt-2 ">
                  <div className="flex w-full justify-between text-gray-600 bg-green-300 p-2 overflow-hidden">
                    <p className="text-red-500">
                      Selected file:{" "}
                      <span className="text-sm text-gray-600 ">
                        {profilePic.name.length > 20
                          ? profilePic.name.slice(0, 30) + "..."
                          : profilePic.name}{" "}
                      </span>
                    </p>
                    <span
                      onClick={handleRemoveFile}
                      className="cursor-pointer  w-25 font-bold text-red-500 bg-white hover:bg-red-500 hover:text-white py-1 px-2 rounded-full flex items-center"
                    >
                      X
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 font-bold text-white rounded  px-4 hover:bg-blue-500 w-[10rem]"
              >
                Register
              </button>
              <div className="flex flex-col items-end mt-4">
                <p>Already have an account?</p>
                <span
                  onClick={() => navigate("/login")}
                  className="text-red-600 cursor-pointer hover:underline font-bold"
                >
                  Log In
                </span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <button
          onClick={() => loginWithGoogle()}
          className="bg-green-600 flex justify-between items-center w-full mt-4 text-white rounded py-2 font-bold px-4 hover:bg-green-500 "
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

export default Register;
