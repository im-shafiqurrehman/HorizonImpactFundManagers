import express from "express"
import {
    registerUser, activateUser, LoginUser, LogoutUser, updateAccessToken,
    getUserInfo, socialAuth, updateUserInfo,updateUserPassword,updateUserAvatar,
} from "../controllers/user.controller.js";
import { isAuthenticated, authorizeRoles } from "../middleWare/auth.js"

const userRouter = express.Router();
userRouter.post("/registration", registerUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", LoginUser);
userRouter.get("/logout",updateAccessToken, isAuthenticated, LogoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me",updateAccessToken, isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info",updateAccessToken, isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password",updateAccessToken, isAuthenticated, updateUserPassword);
userRouter.put("/update-user-avatar",updateAccessToken, isAuthenticated, updateUserAvatar);

export default userRouter