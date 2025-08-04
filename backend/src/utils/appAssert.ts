import { HttpStatusCode } from "../constant/http";
import assert from "assert";
import AppError from "./AppError";


type AppAssert=(
    condition: any,
    statusCode: HttpStatusCode,
    message: string,
)=> asserts condition;

const appAssert: AppAssert = (condition, statusCode, message) =>
  assert(condition, new AppError(statusCode, message));

export default appAssert;