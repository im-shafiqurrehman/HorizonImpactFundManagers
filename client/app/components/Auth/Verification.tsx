"use client";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { styles } from "../../../app/styles/style";

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
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h1 className={`${styles.title} text-center text-2xl font-bold text-[#e9844c] mb-6`}>
        Verify your account
      </h1>
      <div className="w-full flex items-center justify-center mt-8">
        <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-r from-[#e9844c] to-[#e9844c] flex items-center justify-center shadow-lg shadow-[#e9844c]/20">
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>
      
      <p className="text-center text-[#545454] mt-6 mb-8">
        Please enter the 6-digit verification code sent to your email
      </p>
      
      <div className="mt-8 flex items-center justify-center gap-3">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-12 h-14 bg-transparent border-[3px] rounded-lg text-center text-xl font-bold outline-none text-[#545454] ${
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
      
      <div className="w-full flex justify-center mt-10">
        <button
          className={`${styles.button} w-full max-w-xs bg-gradient-to-r from-[#e9844c] to-[#e9844c] text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg`}
          onClick={verifyHandler}
        >
          Verify OTP
        </button>
      </div>
      
      <h5 className="text-center mt-8 text-sm font-medium text-[#545454]">
        Go back to Sign in?{" "}
        <span
          className="text-[#e9844c] hover:text-[#e9844c]/80 cursor-pointer underline transition-colors"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;
