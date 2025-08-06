import { model, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt.js";
import { signToken } from "../utils/jsonwebtoken.js";
import genAvatar from "../utils/avatar.js";
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: genAvatar(),
    }
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        return next();
    }
    this.password = await hashValue(this.password);
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return await compareValue(password, this.password);
};
userSchema.methods.hashPassword = async function (password){
  return await hashValue(password);
};
userSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
userSchema.methods.generateToken = function () {
    return signToken({ userId: this._id, username: this.username });
};
const UserModel = model("User", userSchema);
export default UserModel;
