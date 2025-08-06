import protectedRoute from "../middleware/auth.middleware.js";
import { changePassword, getUserById, getUserUsername, syncUser, updateProfile } from "../controller/user.controller.js";
import upload from "../utils/upload.js";
export default (router) => {
    router.use(protectedRoute);
    router.route("/users/sync").get(syncUser);
    router.route("/users/:id").get(getUserById);
    router.route("/users/username/:username").get(getUserUsername);
    router.route("/users/profile").put(upload.single("image"), updateProfile);
    router.route("/users/profile/password").put(changePassword);
};
