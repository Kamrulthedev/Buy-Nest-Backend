import express , {Request, Response} from "express";
import { UserControllars } from "./user.controllar";

const router = express.Router();

router.post("/create-admin", UserControllars.CreateAdminSQ);

export const UserRoutes = router;