import { loginHandler, logOutHandler, registerHandler } from "../controller/auth.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";
export default (router) => {
    router.route('/auth/register').post(registerHandler);
    router.route('/auth/login').post(loginHandler);
    router.route("/auth/logout").post(protectedRoute, logOutHandler);
};
