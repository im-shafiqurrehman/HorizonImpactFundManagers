"use client";

import type React from "react";
import { type FC, useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useCheckResetPasswordOtpMutation,
  useForgetpasswordMutation,
  useResetPasswordMutation,
} from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
}

const Forgetpasswordotp: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // 6 OTP fields
  const [resendTimer, setResendTimer] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const { token } = useSelector((state: any) => state.auth);
  const { user } = useSelector((state: any) => state.auth);

  const [checkResetPasswordOtp, { isLoading: isVerifying, isSuccess: isVerifySuccess, error: verifyError }] =
    useCheckResetPasswordOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgetpasswordMutation();
  const [resetPassword, { isLoading: isResetting, isSuccess: isResetSuccess, error: resetError }] =
    useResetPasswordMutation();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the timer
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          setShowResendButton(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
  };

  // Start the timer on component mount
  useEffect(() => {
    startTimer();

    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVerifySuccess) {
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    }
    if (verifyError) {
      if ("data" in verifyError) {
        const errorData = verifyError as any;
        toast.error(errorData.data.message || "Invalid OTP");
        setInvalidError(true);
      }
    }
  }, [isVerifySuccess, verifyError]);

  useEffect(() => {
    if (isResetSuccess) {
      toast.success("Password reset successfully");
      setTimeout(() => {
        setRoute("Login");
      }, 1500);
    }
    if (resetError) {
      if ("data" in resetError) {
        const errorData = resetError as any;
        toast.error(errorData.data.message || "Failed to reset password");
      }
    }
  }, [isResetSuccess, resetError, setRoute]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs[index - 1].current) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, 6);
      const newOtp = [...otp];

      digits.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });

      setOtp(newOtp);

      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      if (nextEmptyIndex !== -1 && inputRefs[nextEmptyIndex].current) {
        inputRefs[nextEmptyIndex].current?.focus();
      } else if (inputRefs[5].current) {
        inputRefs[5].current?.focus();
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP ");
      return;
    }

    await checkResetPasswordOtp({
      activation_token: token,
      activation_code: otpCode,
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    await resetPassword({
      activation_token: token,
      newpassword: passwordData.newPassword,
    });
  };

  const handleResendOtp = async () => {
    try {
      if (user) {
        await resendOtp({
          name: user.name,
          email: user.email,
        });
        setResendTimer(60);
        setShowResendButton(false);
        startTimer();
        toast.success("OTP resent successfully");
      } else {
        toast.error("User information not found");
      }
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="w-[65%] sm:w-[95%] max-w-[420px] mx-auto px-2 py-2 mt-[-12px] sm:mt-2 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.07)] bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center text-lg font-bold text-[#e9844c] mb-4">
        {otpVerified ? "Reset Password" : "Verify Email"}
      </h1>
      <p className="text-center text-[#545454] sm:text-[14px] text-xs mb-6">
        {otpVerified ? "Enter your new password" : "We've sent a 6-digit verification code to your email"}
      </p>

      {!otpVerified ? (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 border-2 rounded-md text-center text-lg font-medium outline-none text-gray-800 ${
                  invalidError ? "shake border-red-500" : "border-[#e9844c]/30"
                } focus:border-[#e9844c] transition-colors`}
                required
              />
            ))}
          </div>

          {showResendButton ? (
            <div className="text-center mb-4">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-sm text-[#e9844c] hover:text-[#d8733b]"
              >
                Resend OTP
              </button>
            </div>
          ) : (
            <p className="text-center text-sm text-[#545454] mb-4">Resend OTP in {resendTimer} seconds</p>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md mt-4 hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300"
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className={`w-full px-3 py-2 rounded-md border border-[#e9844c]/30 outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800`}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#545454]"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPassword.newPassword ? (
                  <AiOutlineEyeInvisible size={16} />
                ) : (
                  <AiOutlineEye size={16} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#545454] sm:text-[16px] text-xs font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className={`w-full px-3 py-2 rounded-md border border-[#e9844c]/30 outline-none focus:border-[#e9844c] bg-gray-100 text-gray-800`}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#545454]"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPassword.confirmPassword ? (
                  <AiOutlineEyeInvisible size={16} />
                ) : (
                  <AiOutlineEye size={16} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isResetting}
            className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md mt-4 hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300"
          >
            {isResetting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <p className="text-center text-[12px] sm:text-[16px] text-[#545454] mt-3">
        Back to{" "}
        <span className="text-[#e9844c] cursor-pointer" onClick={() => setRoute("Login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Forgetpasswordotp;