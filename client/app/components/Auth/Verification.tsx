"use client";

import { useActivationMutation, useRegisterMutation } from "@/redux/features/auth/authApi";
import { type FC, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token, user } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error, data }] = useActivationMutation();
  const [registerUser] = useRegisterMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle API responses
  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Account activated successfully");
      setTimeout(() => {
        setRoute("Login");
      }, 2000); // 2 seconds delay
    }
    if (error) {
      const errorData = error as any;
      if ("data" in error) {
        toast.error(errorData.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setInvalidError(true); // Trigger shake effect
    }
  }, [isSuccess, error, data, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

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

  // Handle OTP verification
  const verifyHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 6) {
      setInvalidError(true); // Trigger shake effect for incomplete code
      toast.error("Please enter a complete 6-digit code");
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  // Handle resend OTP functionality
  const handleResendOtp = async () => {
    try {
      if (user) {
        await registerUser({
          name: user.name,
          email: user.email,
          password: user.password,
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

  // Handle input change and focus management
  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false); // Reset error state on valid input
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="w-[65%] sm:w-[95%] max-w-[420px] mx-auto px-2 py-2 mt-[-12px] sm:mt-2 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.07)] bg-white">
      <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster component */}
      <h1 className="text-center text-lg font-bold text-[#e9844c] mb-4">Verify Your Account</h1>
      <div className="w-full flex items-center justify-center mt-6">
        <div className="w-[80px] h-[80px] rounded-full bg-[#e9844c] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>
      <div className="mt-10 flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 border-2 rounded-md text-center text-lg font-medium outline-none text-gray-800 ${
              invalidError ? "shake border-red-500" : "border-[#e9844c]/30"
            } focus:border-[#e9844c] transition-colors`}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={1}
          />
        ))}
      </div>
      {/* Resend OTP section */}
      {showResendButton ? (
        <div className="w-full flex justify-center mt-5">
          <button
            className="text-[#e9844c] hover:text-[#d8733b] font-medium text-sm"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        </div>
      ) : (
        <p className="text-center mt-5 text-sm text-[#545454]">
          Resend OTP in {resendTimer} seconds
        </p>
      )}
      <div className="w-full flex justify-center mt-10">
        <button
          className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300"
          onClick={verifyHandler}
        >
          Verify OTP
        </button>
      </div>
      <p className="text-center text-[12px] sm:text-[16px] text-[#545454] mt-3">
        Go back to Sign in?{" "}
        <span className="text-[#e9844c] cursor-pointer" onClick={() => setRoute("Login")}>
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Verification;