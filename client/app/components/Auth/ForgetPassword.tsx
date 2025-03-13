"use client";

import { type FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useForgetpasswordMutation } from "@/redux/features/auth/authApi";

interface Props {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
}

// Validation schema
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email").required("Please enter your email"),
});

const ForgetPassword: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [forgetpassword, { isSuccess, error, data }] = useForgetpasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message);
      setRoute("forgetpasswordotp");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email }) => {
      await forgetpassword({ name, email });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-[65%] sm:w-[95%] max-w-[420px] mx-auto px-2 py-2 mt-[-12px] sm:mt-2 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.07)] bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center text-lg font-bold text-[#e9844c] mb-4">Forgot Password</h1>
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
            id="name"
            placeholder="John Doe"
            className={`${errors.name && touched.name ? "border-red-500" : "border-[#e9844c]/30"} 
            w-full px-3 py-2 rounded-md border outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800`}
          />
          {errors.name && touched.name && <span className="text-red-500 text-[10px]">{errors.name}</span>}
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
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email ? "border-red-500" : "border-[#e9844c]/30"} 
            w-full px-3 py-2 rounded-md border outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800`}
          />
          {errors.email && touched.email && <span className="text-red-500 text-[10px]">{errors.email}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md mt-4 hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300"
        >
          Send OTP
        </button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#545454]/20"></div>
          </div>
          <div className="relative flex justify-center text-[12px] sm:text-[14px]">
            <span className="px-2 bg-white text-[#545454]">Or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-[12px] sm:text-[16px] text-[#545454] mt-3">
          Not have any account?{" "}
          <span className="text-[#e9844c] cursor-pointer" onClick={() => setRoute("Sign-Up")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;