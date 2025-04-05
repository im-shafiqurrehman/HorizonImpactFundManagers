"use client";

import { useForgetpasswordMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
};

const ForgetPassword: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [forgetpassword, { isLoading,isSuccess, error, data }] = useForgetpasswordMutation();

  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: async ({ name, email }) => {
      await forgetpassword({ name, email });
    },
  });

  // Handle API responses
  useEffect(() => {
    if (isSuccess) {
      // const message = data?.message || "OTP sent successfully";
      // toast.success(message);
      setRoute("Forgetpasswordotp");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "An error occurred");
      }
    }
  }, [isSuccess, error, data, setRoute]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-[65%] sm:w-[95%] max-w-[420px] mx-auto px-2 py-2 mt-[-12px] sm:mt-2 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.07)] bg-white">
      <h1 className="text-center text-lg font-bold text-[#e9844c] mb-4 py-2">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="name">
            Enter your name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            id="name"
            placeholder="John Doe"
            className={`w-full px-3 py-2 rounded-md border outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800 ${
              errors.name && touched.name ? "border-red-500" : "border-[#e9844c]/30"
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 text-[10px]">{errors.name}</span>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="email">
            Enter your email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`w-full px-3 py-2 rounded-md border outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800 ${
              errors.email && touched.email ? "border-red-500" : "border-[#e9844c]/30"
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-[10px]">{errors.email}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md mt-4 hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300"
        >
           {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {/* Back to Login Link */}
      <p className="text-center text-[12px] sm:text-[16px] text-[#545454] mt-3">
        Back to{" "}
        <span className="text-[#e9844c] cursor-pointer" onClick={() => setRoute("Login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default ForgetPassword;