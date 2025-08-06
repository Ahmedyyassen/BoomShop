import { BAD_REQUEST, NOT_FOUND, OK } from "../constant/http";
import asyncHandler from "../middleware/asyncHandler";
import UserModel from "../model/user.model";
import appAssert from "../utils/appAssert";
import base64 from "../utils/base64";
import { deleteImage, uploadImage } from "../utils/cloudinary";
import extractPublicId from "../utils/extractPublicId";
import { changePasswordValidation, profileValidation } from "../utils/validateUser";



export const syncUser = asyncHandler(
    async (req, res) => {
        const userId = req.userId;
        const user = await UserModel.findById(userId).select("-password");
        appAssert(user, NOT_FOUND, "User not found");
        res.status(OK).json({ user});
    }
)

export const getUserById = asyncHandler(
    async (req, res) => {
        const userId = req.params.id;
        const user = await UserModel.findById(userId).select("-password");
        appAssert(user, NOT_FOUND, "User not found");
        res.status(OK).json({ user });
    }
)
export const getUserUsername = asyncHandler(
    async (req, res) => {
        const username = req.params.username;
        const user = await UserModel.findOne({ username  }).select("-password");
        appAssert(user, NOT_FOUND, "User not found");
        res.status(OK).json({ user });
    }
)

export const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const imageFile = req.file;
    const { error } = profileValidation(req.body);
    appAssert(!error, BAD_REQUEST, error?.details[0].message!);
    const user = await UserModel.findById(userId).select("-password");
    appAssert(user, NOT_FOUND, "User not found");
    let profilePicture = "";
    let newUser = null;
    if (imageFile) {
        const oldImagePublucId = extractPublicId(user.profilePicture);
        if (oldImagePublucId) {
            await deleteImage(oldImagePublucId);
        }
        const image64 = base64(imageFile);
        profilePicture = await uploadImage(image64);
        newUser = await UserModel.findByIdAndUpdate(userId, { ...req.body, profilePicture }, { new: true });
    }
    else {
        newUser = await UserModel.findByIdAndUpdate(userId, { ...req.body }, { new: true });
    }
    appAssert(user, NOT_FOUND, "User not found");
    res.status(OK).json({ newUser });
});

export const changePassword = asyncHandler(
    async(req, res,)=>{
        const userId = req.userId;
        const { error } = changePasswordValidation(req.body);
        const { currentPassword, newPassword } = req.body;
        appAssert(!error, BAD_REQUEST, error?.details[0].message!);
        const user = await UserModel.findById(userId);
        appAssert(user, NOT_FOUND, "User not found");
        const isMatched = await user.comparePassword(currentPassword);
        appAssert(isMatched, BAD_REQUEST, "current password is incorrect");
        const hashedPassword = await user.hashPassword(newPassword);
        const newUser = await UserModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true } );
        appAssert(newUser, NOT_FOUND, "User not found");
        res.status(OK).json({ newUser });
    }
)