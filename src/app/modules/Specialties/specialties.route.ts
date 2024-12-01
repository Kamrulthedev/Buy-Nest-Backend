import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesControllars } from "./specialties.controllar";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { Fileuploader } from "../../../helpars/fileUploads";
import { SpecialtiesValidation } from "./specialties.validation";


const router = express.Router();

router.post('/insert', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = SpecialtiesValidation.CreateSpecialties.parse(JSON.parse(req.body.data))
        return SpecialtiesControllars.InsertIntoDB(req, res, next)
    },);


router.get('/specialties', SpecialtiesControllars.GetSpecialtiesDB);

router.get('/specialties/:id', SpecialtiesControllars.GetByIdSpecialtiesDB);

router.delete('/specialties/:id', SpecialtiesControllars.DeleteSpecialtiesDB);


export const SpecialtesRoutes = router; 
