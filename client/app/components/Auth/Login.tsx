"use client"

import { useLoginMutation } from "@/redux/features/auth/authApi"
import { useFormik } from "formik"
import { signIn } from "next-auth/react"
import { type FC, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import * as Yup from "yup"

type Props = {
  setRoute: (route: string) => void
  setOpen: (open: boolean) => void
  refetch: () => void
}

const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(8),
})

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false)
  const [login, { isLoading,error, isSuccess }] = useLoginMutation()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password })
    },
  })

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

  const { errors, touched, values, handleChange, handleSubmit } = formik

  return (
    <div className="w-[65%] sm:w-[95%] max-w-[420px] mx-auto px-2 py-2 mt-[-12px] sm:mt-2 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.07)] bg-white">
      <h1 className="text-center text-[16px] font-bold text-[#e9844c] mb-4 py-2">Login with Horizon Impact Fund Managers</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="email">
            Enter your email address
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

        <div className="space-y-2">
          <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="password">
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
          <div className="flex justify-end">
        <span
         className="text-[#e9844c] text-[12px] sm:text-[14px] cursor-pointer hover:underline"
          onClick={() => {
                setRoute("Forget");
              }}
          >
           Forgot password?
        </span>
        </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md mt-4 hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300"
        >
          {isLoading ? "Logginng in..." : "Login"}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#545454]/20"></div>
          </div>
          <div className="relative flex justify-center text-[12px] sm:text-[14px]">
            <span className="px-2 bg-white text-[#545454]">Or join with</span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <div
            className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-[#545454]/20 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => signIn("google")}
          >
            <FcGoogle size={20} />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-[#545454]/20 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => signIn("github")}
          >
            <AiFillGithub size={20} className="text-[#545454]" />
          </div>
        </div>

        <p className="text-center text-[12px] sm:text-[16px] text-[#545454] mt-3">
          Not have any account?{" "}
          <span className="text-[#e9844c] cursor-pointer" onClick={() => setRoute("Sign-Up")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login

