import { Document, model, Schema, Types } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import { signToken, verifyToken } from "../utils/jsonwebtoken";
import genAvatar from "../utils/avatar";


export interface UserDocument extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
  compareToken(token: string): Promise<boolean>;
  omitPassword(): Pick<UserDocument, "_id" | "firstName" | "lastName" | "username" | "email" | "createdAt" | "updatedAt">;
}

const userSchema = new Schema<UserDocument>(
  {
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
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashValue(this.password);
  next();
});
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await compareValue(password, this.password);
};
userSchema.methods.omitPassword = function(){
    const user = this.toObject();
    delete user.password;
    return user;
}
userSchema.methods.generateToken = function (): string {
  return signToken({ userId: this._id, username: this.username });
};
const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;