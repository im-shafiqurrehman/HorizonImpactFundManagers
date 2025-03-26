import express from "express"
import {
    registerUser, activateUser, LoginUser, LogoutUser, updateAccessToken,
    getUserInfo, socialAuth, updateUserInfo,updateUserPassword,updateUserAvatar,
    forgetpassword,checkResetPasswordOtp,resetPassword, sendContactForm
} from "../controllers/user.controller.js"
import { isAuthenticated, authorizeRoles } from "../middleWare/auth.js"

const userRouter = express.Router();
userRouter.post("/registration", registerUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", LoginUser);
userRouter.get("/logout",isAuthenticated, LogoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me",isAuthenticated, getUserInfo);
userRouter.post("/social-auth", updateAccessToken,socialAuth);
userRouter.put("/update-user-info",updateAccessToken, isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password",updateAccessToken, isAuthenticated, updateUserPassword);
userRouter.put("/update-user-avatar",updateAccessToken, isAuthenticated, updateUserAvatar);
userRouter.post("/forgetpassword",forgetpassword);
userRouter.post("/checkResetPasswordOtp",checkResetPasswordOtp);
userRouter.post("/resetPassword",resetPassword);
userRouter.post("/send-email", sendContactForm);


export default userRouter