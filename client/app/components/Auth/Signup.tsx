"use client";

import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";

type Props = {
  setRoute: (route: string) => void;
};

const Schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(8),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { isLoading, data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full flex justify-center items-center bg-transparent mt-4">
      <div className="w-[65%] sm:w-[95%] max-w-[420px] mx-auto px-2 py-2 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.07)] bg-white">
        <h1 className="text-center text-lg font-bold text-[#e9844c] mb-4 py-2">Join Horizon Impact Fund Managers</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="name">
              Full Name
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

          <div className="space-y-2">
            <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="you@example.com"
              className={`${errors.email && touched.email ? "border-red-500" : "border-[#e9844c]/30"} 
              w-full px-3 py-2 rounded-md border outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800`}
            />
            {errors.email && touched.email && <span className="text-red-500 text-[10px]">{errors.email}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-[#545454] text-xs font-medium sm:text-[16px]" htmlFor="password" >
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
                className={`${errors.password && touched.password ? "border-red-500" : "border-[#e9844c]/30"} 
                w-full px-3 py-2 rounded-md border outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800`}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#545454] cursor-pointer"
                  size={16}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#545454] cursor-pointer"
                  size={16}
                  onClick={() => setShow(false)}
                />
              )}
            </div>
            {errors.password && touched.password && <span className="text-red-500 text-[10px]">{errors.password}</span>}
          </div>

          <button type="submit" className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md mt-4 hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300">
          {isLoading ? "Creating account..." : "Sign Up"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#545454]/20"></div>
            </div>
            <div className="relative flex justify-center text-[10px] sm:text-[14px]">
              <span className="px-2 bg-white text-[#545454]">Or join with</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-[#545454]/20 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => console.log("Google Signup")}
            >
              <FcGoogle size={20} />
            </div>
            <div
              className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-[#545454]/20 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => console.log("Github Signup")}
            >
              <AiFillGithub size={20} className="text-[#545454]" />
            </div>
          </div>

          <p className="text-center text-[12px] text-[#545454] mt-3 sm:text-[16px]">
            Already have an account?{" "}
            <span className="text-[#e9844c] cursor-pointer" onClick={() => setRoute("Login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;  