import  express, { Application, Request, Response, urlencoded }  from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.routes";


const app: Application = express();
app.use(cors());

//use parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) =>{
    res.send("PH Helth Care Server....")
});

app.use('/api/v1/user', UserRoutes);

export default app;