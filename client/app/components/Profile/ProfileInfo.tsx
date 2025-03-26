"use client"

import { styles } from "@/app/styles/style"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import { useUpdateAvatarMutation, useUpdateUserMutation } from "@/redux/features/user/userApi"
import Image from "next/image"
import React from "react"
import toast from "react-hot-toast"
import { AiOutlineCamera } from "react-icons/ai"
import avatarDefault from "../../../public/assets/Profile.png"
import Loader from "../Loader/Loader" // Assuming you have a Loader component

type Props = {
  user: any
  avatar: string | null
}

const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
  const [name, setName] = React.useState(user && user.name)
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
  const [updateUser, { isSuccess: success, error: updateUserError, isLoading: isUpdating }] = useUpdateUserMutation()
  const [shouldFetch, setShouldFetch] = React.useState(false)
  const { refetch, isLoading } = useLoadUserQuery(undefined, {
    skip: !shouldFetch,
  })

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result
        updateAvatar(avatar)
      }
    }

    fileReader.readAsDataURL(e.target.files[0])
  }

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Avatar updated successfully")
      setShouldFetch(true)
    }
    if (error) {
      console.log(error)
      toast.error("Error updating avatar")
    }
  }, [isSuccess, error])

  React.useEffect(() => {
    if (shouldFetch) {
      refetch()
      setShouldFetch(false)
    }
  }, [shouldFetch, refetch])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (name !== "") {
      const result = await updateUser({
        name: name,
      })
      if (result) {
        toast.success("Profile updated successfully")
        setShouldFetch(true)
      } else if (updateUserError) {
        toast.error("Error updating profile")
        console.log(updateUserError)
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 overflow-x-hidden">
      {/* Profile Avatar Section */}
      <div className="flex justify-center mb-12">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="relative group">
            <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full overflow-hidden border-4 border-[#e9844c] shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                alt="Profile"
                width={170}
                height={170}
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />
            <label htmlFor="avatar">
              <div className="w-[35px] h-[35px] bg-[#e9844c] rounded-full absolute bottom-1 right-1 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:bg-[#c96b38] hover:scale-110 shadow-md">
                <AiOutlineCamera size={20} className="text-white" />
              </div>
            </label>
          </div>
        )}
      </div>

      {/* User details form */}
      <div className="w-full overflow-hidden">
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-[#e9844c]/20">
          <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-[#e9844c] text-center">Personal Information</h2>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-full">
              <label className="block text-[#545454] font-medium mb-2 text-base sm:text-lg" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input} w-full border border-[#e9844c]/40 rounded-lg p-3 sm:p-4 text-base bg-white focus:border-[#e9844c] focus:ring-2 focus:ring-[#e9844c]/30 transition-all duration-300`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="block text-[#545454] font-medium mb-2 text-base sm:text-lg" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                readOnly
                id="email"
                className={`${styles.input} w-full border border-[#545454]/20 rounded-lg p-3 sm:p-4 text-base bg-gray-50 text-[#545454]/80`}
                required
                value={user && user.email}
              />
            </div>

            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-[200px] sm:w-[220px] h-[45px] border border-[#e9844c] rounded-lg cursor-pointer bg-[#e9844c] text-white font-medium transition-all duration-300 transform hover:bg-[#d97a45] hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileInfo

