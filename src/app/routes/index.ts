import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { VendorsRoutes } from "../modules/Vendor/vendor.route";



const router = express.Router();

const moduleRotes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/vendors",
    route: VendorsRoutes
  }
];

moduleRotes.forEach(route => router.use(route.path, route.route));

export default router;
