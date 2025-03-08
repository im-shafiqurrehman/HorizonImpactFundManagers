"use client";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { styles } from "../../../app/styles/style";

type Props = {
  setRoute: (route: string) => void;
};

// Form validation schema using Yup
const Schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(8),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false); // State to toggle password visibility
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  // Handle side effects based on API responses
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification"); // Redirect to verification route
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error, data?.message, setRoute]);

  // Initialize formik for form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data); // Call register API
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full p-3 bg-white rounded-lg shadow-md">
      <h1 className={`${styles.title} text-center text-2xl font-bold text-[#e9844c] mb-6`}>
        Join Horizon
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div className="w-full relative mb-4">
          <label className={`${styles.label} text-[#545454] font-medium`} htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="John Doe"
            className={`${errors.name && touched.name ? "border-red-500" : "border-[#e9844c]/30 focus:border-[#e9844c]"} ${
              styles.input
            } w-full p-3 rounded-lg border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e9844c]/30`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 text-sm pt-1 block">{errors.name}</span>
          )}
        </div>

        {/* Email Input */}
        <div className="w-full relative mb-4">
          <label className={`${styles.label} text-[#545454] font-medium`} htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="you@example.com"
            className={`${errors.email && touched.email ? "border-red-500" : "border-[#e9844c]/30 focus:border-[#e9844c]"} ${
              styles.input
            } w-full p-3 rounded-lg border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e9844c]/30`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-sm pt-1 block">{errors.email}</span>
          )}
        </div>

        {/* Password Input */}
        <div className="w-full relative mb-4">
          <label className={`${styles.label} text-[#545454] font-medium`} htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password@#!&"
              className={`${
                errors.password && touched.password ? "border-red-500" : "border-[#e9844c]/30 focus:border-[#e9844c]"
              } ${styles.input} w-full p-3 rounded-lg border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e9844c]/30`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#545454] hover:text-[#e9844c] cursor-pointer transition-colors"
                size={22}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#545454] hover:text-[#e9844c] cursor-pointer transition-colors"
                size={22}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 text-sm pt-1 block">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full mt-6">
          <input
            type="submit"
            value="Sign Up"
            className={`${styles.button} w-full bg-[#e9844c] hover:bg-[#e9844c]/90 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md hover:shadow-lg`}
          />
        </div>

        {/* Alternative Signup Options */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#545454]/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#545454]">Or join with</span>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-6">
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#545454]/20 hover:border-[#e9844c]/50 hover:bg-[#e9844c]/5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow"
            onClick={() => console.log("Google Signup")}
          >
            <FcGoogle size={24} />
          </div>
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#545454]/20 hover:border-[#e9844c]/50 hover:bg-[#e9844c]/5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow"
            onClick={() => console.log("Github Signup")}
          >
            <AiFillGithub size={24} className="text-[#545454]" />
          </div>
        </div>

        {/* Login Redirect */}
        <h5 className="text-center font-medium text-sm text-[#545454]">
          Already have an account?{" "}
          <span
            className="text-[#e9844c] hover:text-[#e9844c]/80 pl-1 cursor-pointer underline transition-colors"
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Signup;