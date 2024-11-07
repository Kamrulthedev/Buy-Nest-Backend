import  express, { Application, Request, Response, urlencoded }  from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.routes";
import { AdminRoutes } from "./app/modules/admin/admin.route";
import router from "./app/routes";


const app: Application = express();
app.use(cors());

//use parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) =>{
    res.send("PH Helth Care Server....")
});

app.use("/api/v1", router)

export default app;