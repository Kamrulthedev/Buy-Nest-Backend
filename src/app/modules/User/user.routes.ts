import express , {Request, Response} from "express";
import { UserControllars } from "./user.controllar";

const router = express.Router();

router.get("/user", UserControllars.CreateAdminSQ);

export const UserRoutes = router;