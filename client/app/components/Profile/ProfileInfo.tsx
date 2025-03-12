"use client";

import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useUpdateAvatarMutation, useUpdateUserMutation } from "@/redux/features/user/userApi";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import avatarDefault from "../../../public/assets/Profile.png";
import Loader from "../Loader/Loader"; // Assuming you have a Loader component

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
  const [name, setName] = React.useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateUser, { isSuccess: success, error: updateUserError }] = useUpdateUserMutation();
  const [shouldFetch, setShouldFetch] = React.useState(false);
  const { refetch, isLoading } = useLoadUserQuery(undefined, {
    skip: !shouldFetch,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Avatar updated successfully");
      setShouldFetch(true);
    }
    if (error) {
      console.log(error);
      toast.error("Error updating avatar");
    }
  }, [isSuccess, error]);

  React.useEffect(() => {
    if (shouldFetch) {
      refetch();
      setShouldFetch(false);
    }
  }, [shouldFetch, refetch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      const result = await updateUser({
        name: name,
      });
      if (result) {
        toast.success("Profile updated successfully");
        setShouldFetch(true);
      } else if (updateUserError) {
        toast.error("Error updating profile");
        console.log(updateUserError);
      }
    }
  };

  return (
    <>
      <div className="w-full flex justify-center h-full mt-16 mb-[-4]">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="relative">
            <Image
              src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
              alt="Profile"
              width={120}
              height={120}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-[#e9844c]"
            />
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-[#e9844c] rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:bg-[#c96b38] hover:scale-110">
                <AiOutlineCamera size={20} className="text-white" />
              </div>
            </label>
          </div>
        )}
      </div>
      <br />
      <br />

      {/* User details form */}
      <div className="w-full pl-6 800px:pl-10 mb-10">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-[#e9844c]/30">
          <h2 className="text-xl font-semibold mb-6 text-[#e9844c]">Personal Information</h2>
          <div className="800px:w-[70%] m-auto block pb-4">
            <div className="w-[100%] mb-6">
              <label className="block text-[#545454] font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input} !w-[95%] border border-[#e9844c]/50 rounded-lg p-3 bg-white focus:border-[#e9844c] focus:ring-2 focus:ring-[#e9844c]/30 transition-all duration-300`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block text-[#545454] font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                readOnly
                id="email"
                className={`${styles.input} !w-[95%] border border-[#545454]/20 rounded-lg p-3 bg-gray-100 text-[#545454]/80`}
                required
                value={user && user.email}
              />
            </div>
            <br />
            <input
              type="submit"
              className="w-full 800px:w-[250px] h-[45px] border border-[#e9844c] text-center rounded-lg mt-8 cursor-pointer bg-[#e9844c] text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
              required
              value="Update Profile"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;