import { CookieOptions, Response } from "express"
import { NODE_ENV } from "../constant/env"
import { ONE_DAY } from "./date"

const cookieOption:CookieOptions={
    expires: ONE_DAY(),
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
}

export const AuthCookie = (res: Response, token: string) => {
  return res.cookie("token", token, cookieOption);
};

export const ClearCookies = (res: Response) => {
  return res.clearCookie("token", cookieOption);
};