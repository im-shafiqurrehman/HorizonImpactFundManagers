import dotenv from "dotenv";
import redisClient from '../utilis/redis.js';
const isProduction = process.env.NODE_ENV === 'production';


dotenv.config();


const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const accessRefreshExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "259200", 10);
export const accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'None',   // Change this to 'None' for cross-origin requests
    secure: isProduction,    
};

export const refreshTokenOptions = {
    expires: new Date(Date.now() + accessRefreshExpire * 1000),
    maxAge: accessRefreshExpire * 1000,
    httpOnly: true,
    sameSite: 'None',   // Change this to 'None' for cross-origin requests
    secure: isProduction,      
};

export const sendToken = async (user, statusCode, res) => {
    // Store user data in Redis
    // console.log('Storing user in Redis:', user._id.toString());

    await redisClient.set(user._id.toString(), JSON.stringify(user), {
        EX: 7 * 24 * 60 * 60 // 7 days in seconds
    });
    // console.log('User stored in Redis');


    // Create access and refresh tokens using the instance methods
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    // If in production, ensure cookies are secure
    if (process.env.NODE_ENV === "production") {
        accessTokenOptions.secure = true;
        refreshTokenOptions.secure = true;
    }

    // Send the tokens as cookies and respond with the user info
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        user, // Send the user data
        accessToken, // Optionally send the token in the response
    });
};
