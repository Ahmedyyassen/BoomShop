import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import { UserDocument } from "../model/user.model";
import { JWT_SECRET } from "../constant/env";

type TokenPayload = {
  userId: UserDocument["_id"];
  username: UserDocument["username"];
};
type signOptionAndSecret = SignOptions & {
  secret: string;
};
type verifyOptionAndSecret = VerifyOptions & {
  secret: string;
};

const signTokenOptions: signOptionAndSecret = {
  expiresIn: "1d",
  secret: JWT_SECRET,
  audience: ['user']
};
const veridyTokenOptions: verifyOptionAndSecret = {
  audience: ['user'],
  secret: JWT_SECRET,
};

export const signToken = (payload: TokenPayload): string => {
  const { secret, ...options } = signTokenOptions || {};
  return sign(payload, secret, options);
};

export const verifyToken = (token: string): TokenPayload => {
  const { secret, ...options } = veridyTokenOptions || {};
  return verify(token, secret, options) as TokenPayload;
};