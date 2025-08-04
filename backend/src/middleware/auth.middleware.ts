import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constant/http";
import { verifyToken } from "../utils/jsonwebtoken";


const protectedRoute:RequestHandler = (req,res,next)=> {
    const token = req.cookies.token as string;
    appAssert(token, UNAUTHORIZED, "not authorized");

    const decoded = verifyToken(token);
    appAssert(decoded, UNAUTHORIZED, "invalid access token");

    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
}
export default protectedRoute;