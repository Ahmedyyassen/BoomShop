import { BAD_REQUEST, CREATED, OK } from "../constant/http.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createUser, signUpUser } from "../service/auth.service.js";
import appAssert from "../utils/appAssert.js";
import { AuthCookie, ClearCookies } from "../utils/cookies.js";
import { loginValidation, registerValidation } from "../utils/validateUser.js";
export const registerHandler = asyncHandler(async (req, res, next) => {
    const { error } = registerValidation(req.body);
    appAssert(!error, BAD_REQUEST, error?.details[0].message);
    const { user, token } = await createUser(req.body);
    AuthCookie(res, token).status(CREATED).json({ message: "User registered successfully", user });
});
export const loginHandler = asyncHandler(async (req, res, next) => {
    const { error } = loginValidation(req.body);
    appAssert(!error, BAD_REQUEST, error?.details[0].message);
    const { user, token } = await signUpUser(req.body);
    AuthCookie(res, token).status(OK).json({ message: "User Login successfully", user });
});
export const logOutHandler = asyncHandler(async (req, res, next) => {
    req.userId = null;
    req.username = null;
    ClearCookies(res).status(OK).json({ message: "User Logout successfully" });
});
