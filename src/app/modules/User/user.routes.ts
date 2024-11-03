import express , {Request, Response} from "express";

const router = express.Router();



router.get("/", (req : Request, res : Response) => {
    res.send({
        message : "Route is Working Perfectly.."
    })
});

export const UserRoutes = router;