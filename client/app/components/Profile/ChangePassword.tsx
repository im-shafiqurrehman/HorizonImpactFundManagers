"use client";

import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

type Props = Record<string, never>; // Explicitly define an empty object type

const ChangePassword: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as  { data: { message: string }};
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  const passwordChangeHandler = async (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0  mt-32 mb-16">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-[#e9844c]/30">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#e9844c]/10 flex items-center justify-center">
            <RiLockPasswordLine size={30} className="text-[#e9844c]" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center text-[#e9844c] mb-8">Change Your Password</h1>

        <div className="w-full">
          <form aria-required onSubmit={passwordChangeHandler} className="flex flex-col items-center">
            <div className="w-[100%] 800px:w-[60%] mt-5">
              <label htmlFor="old-password" className="block pb-2 text-gray-700 dark:text-gray-300 font-medium">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  id="old-password"
                  className={`${styles.input} !w-[95%] border border-[#e9844c]/50 rounded-lg p-3 bg-white focus:border-[#e9844c] focus:ring-2 focus:ring-[#e9844c]/30 transition-all duration-300`}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <div
                  className="absolute top-1/2 right-8 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </div>
              </div>
            </div>

            <div className="w-[100%] 800px:w-[60%] mt-5">
              <label htmlFor="new-password" className="block pb-2 text-gray-700 dark:text-gray-300 font-medium">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  id="new-password"
                  className={`${styles.input} !w-[95%] border border-[#e9844c]/50 rounded-lg p-3 bg-white focus:border-[#e9844c] focus:ring-2 focus:ring-[#e9844c]/30 transition-all duration-300`}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div
                  className="absolute top-1/2 right-8 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </div>
              </div>
            </div>

            <div className="w-[100%] 800px:w-[60%] mt-5">
              <label htmlFor="confirm-password" className="block pb-2 text-gray-700 dark:text-gray-300 font-medium">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm-password"
                  className={`${styles.input} !w-[95%] border border-[#e9844c]/50 rounded-lg p-3 bg-white focus:border-[#e9844c] focus:ring-2 focus:ring-[#e9844c]/30 transition-all duration-300`}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute top-1/2 right-8 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </div>
              </div>

              <input
                type="submit"
                className="!w-[95%] 800px:w-[250px] h-[45px] border border-[#e9844c] text-center rounded-lg mt-8 cursor-pointer bg-[#e9844c] text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                required
                value="Update Password"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;