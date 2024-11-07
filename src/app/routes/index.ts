import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = express.Router();

const moduleRotes = [
  {
    path: "",
    route: UserRoutes,
  },
  {
    path: "",
    route: AdminRoutes,
  },
];

moduleRotes.forEach(route => router.use(route.path, route.route));

export default router;
