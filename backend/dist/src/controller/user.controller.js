import { BAD_REQUEST, NOT_FOUND, OK } from "../constant/http.js";
import asyncHandler from "../middleware/asyncHandler.js";
import UserModel from "../model/user.model.js";
import appAssert from "../utils/appAssert.js";
import base64 from "../utils/base64.js";
import { uploadImage } from "../utils/cloudinary.js";
import { profileValidation } from "../utils/validateUser.js";
export const syncUser = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select("-password");
    appAssert(user, NOT_FOUND, "User not found");
    res.status(OK).json({ user });
});
export const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).select("-password");
    appAssert(user, NOT_FOUND, "User not found");
    res.status(OK).json({ user });
});
export const getUserUsername = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await UserModel.findOne({ username }).select("-password");
    appAssert(user, NOT_FOUND, "User not found");
    res.status(OK).json({ user });
});
export const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const imageFile = req.file;
    const { error } = profileValidation(req.body);
    appAssert(!error, BAD_REQUEST, error?.details[0].message);
    let profilePicture = "";
    let user = null;
    if (imageFile) {
        const image64 = base64(imageFile);
        profilePicture = await uploadImage(image64);
        user = await UserModel.findByIdAndUpdate(userId, { ...req.body, profilePicture }, { new: true });
    }
    else {
        user = await UserModel.findByIdAndUpdate(userId, { ...req.body }, { new: true });
    }
    appAssert(user, NOT_FOUND, "User not found");
    res.status(OK).json({ user });
});
