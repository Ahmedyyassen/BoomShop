import { Router } from "express";
import { loginHandler, logOutHandler, registerHandler } from "../controller/auth.controller";
import protectedRoute from "../middleware/auth.middleware";


export default (router: Router) => {
    router.route('/auth/register').post(registerHandler);
    router.route('/auth/login').post(loginHandler);
    router.route("/auth/logout").post(protectedRoute,logOutHandler);
}