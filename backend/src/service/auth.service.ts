import { BAD_REQUEST, CONFLICT, NOT_FOUND } from "../constant/http";
import UserModel from "../model/user.model"
import appAssert from "../utils/appAssert";

type LoginData= {
    email: string,
    password: string
};
type CreateUserData = LoginData & {
    firstName: string,
    lastName: string,
};

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
}: CreateUserData) => {
  const existingUser = await UserModel.exists({ email });
    appAssert(!existingUser, CONFLICT, "User already exists");

    const username = `${email.split("@")[0]}_${Math.floor(Math.random() * 10000)}`;
    const user = await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    const token = user.generateToken();

  return { 
    user: user.omitPassword(),
    token
  }
};

export const signUpUser = async({email, password}: LoginData)=> {
  const user = await UserModel.findOne({email});
  appAssert(user, NOT_FOUND, "User not found");

  const isMatch = await user.comparePassword(password);
  appAssert(isMatch, BAD_REQUEST, "Password is incorrect");

  const token = user.generateToken();
  return { 
    user: user.omitPassword(),
    token
  }
}