"use client";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
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
  setOpen: (open: boolean) => void;
  refetch: any;
};

const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(8),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { error, isSuccess }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Welcome back to Horizon!");
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess, refetch, setOpen]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h1 className={`${styles.title} text-center text-2xl font-bold text-[#e9844c] mb-6`}>
        Login with Horizon
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="w-full relative mb-4">
          <label className={`${styles.label} text-[#545454] font-medium`} htmlFor="email">
            Enter your email address
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email ? "border-red-500" : "border-[#e9844c]/30 focus:border-[#e9844c]"} ${
              styles.input
            } w-full p-3 rounded-lg border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e9844c]/30`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-sm pt-1 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full relative mb-4">
          <label className={`${styles.label} text-[#545454] font-medium`} htmlFor="password">
            Enter your password
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
        
        <div className="w-full mt-6">
          <input 
            type="submit" 
            value="Login" 
            className={`${styles.button} w-full bg-[#e9844c] hover:bg-[#e9844c]/90 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md hover:shadow-lg`} 
          />
        </div>
        
        <div className="relative my-6">
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
            onClick={() => signIn("google")}
          >
            <FcGoogle size={24} />
          </div>
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#545454]/20 hover:border-[#e9844c]/50 hover:bg-[#e9844c]/5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow"
            onClick={() => signIn("github")}
          >
            <AiFillGithub size={24} className="text-[#545454]" />
          </div>
        </div>
        
        <h5 className="text-center pt-4 font-medium text-sm text-[#545454]">
          Not have any account?{" "}
          <span
            className="text-[#e9844c] hover:text-[#e9844c]/80 pl-1 cursor-pointer underline transition-colors"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
