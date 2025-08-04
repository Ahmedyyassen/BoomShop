import { Router } from "express";
import protectedRoute from "../middleware/auth.middleware";
import { getUserById, getUserUsername, syncUser, updateProfile } from "../controller/user.controller";
import upload from "../utils/upload";


export default (router: Router) => {
    router.use(protectedRoute)
    router.route("/users/sync").get(syncUser);
    router.route("/users/:id").get(getUserById);
    router.route("/users/username/:username").get(getUserUsername);

    router.route("/users/profile").put(upload.single("image"), updateProfile)
};