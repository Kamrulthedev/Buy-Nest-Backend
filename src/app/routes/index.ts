import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { SpecialtesRoutes } from "../modules/Specialties/specialties.route";
import { DoctorsRoutes } from "../modules/Doctor/doctor.route";

const router = express.Router();

const moduleRotes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route : AuthRoutes
  },
  {
    path: '/specialties',
    route : SpecialtesRoutes
  },
  {
    path: "/doctor",
    route: DoctorsRoutes
  }
];

moduleRotes.forEach(route => router.use(route.path, route.route));

export default router;
