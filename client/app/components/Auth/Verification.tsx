"use client";

import { useActivationMutation } from "@/redux/features/auth/authApi";
import { type FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
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
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error, data }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  // Handle API responses
  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      const errorData = error as {data:{message:string}};
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

  // Handle OTP verification
  const verifyHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 6) {
      setInvalidError(true); // Trigger shake effect for incomplete code
      return;
    }
    await activation({
      activationToken: token,
      activationCode: verificationNumber,
    });
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
    <div className="w-[65%] sm:w-[75%] max-w-[320px] mx-auto px-2  rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
      <h1 className="text-center text-lg sm:text-xl font-bold text-[#e9844c] mb-4">
        Verify your account
      </h1>
      <div className="w-full flex items-center justify-center mt-3">
        <div className="w-[45px] h-[45px] rounded-full bg-gradient-to-r from-[#e9844c] to-[#e9844c] flex items-center justify-center shadow-lg shadow-[#e9844c]/20">
          <VscWorkspaceTrusted size={22} className="text-white" />
        </div>
      </div>

      <p className="text-center text-[#545454] text-[12px] sm:text-[16px] mt-3 mb-4">
        Please enter the 6-digit verification code sent to your email
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-8 h-10 sm:w-10 sm:h-12 bg-transparent border-[1.5px] rounded-md text-center text-sm sm:text-base font-bold outline-none text-[#545454] ${
              invalidError
                ? "border-red-500 animate-shake"
                : "border-[#e9844c]/30 focus:border-[#e9844c]"
            } transition-all duration-300`}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={1}
          />
        ))}
      </div>

      <div className="w-full flex justify-center mt-6">
        <button
          className="w-full bg-[#e9844c] text-white font-medium py-3 rounded-md hover:bg-[#e9844c]/90  hover:bg-[#d8733b] hover:-translate-y-1 transition duration-300"
          onClick={verifyHandler}
        >
          Verify OTP
        </button>
      </div>

      <p className="text-center text-[12px] sm:text-[13px] text-[#545454] mt-4">
        Go back to Sign in?{" "}
        <span
          className="text-[#e9844c] cursor-pointer hover:underline"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Verification;