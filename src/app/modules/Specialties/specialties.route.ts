import express from "express";
import { SpecialtiesControllars } from "./specialties.controllar";


const router = express.Router();

router.post('/insert',SpecialtiesControllars.InsertIntoDB);


export const SpecialtesRoutes = router; 
