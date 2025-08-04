import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
const router = Router();
export default () => {
    authRoutes(router);
    userRoutes(router);
    return router;
};
