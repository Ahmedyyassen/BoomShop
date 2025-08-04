import { Router } from "express"
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = Router();
export default ()=>{

    authRoutes(router);
    userRoutes(router);
    return router;
}