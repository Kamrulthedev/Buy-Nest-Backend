import  express, { Application, NextFunction, request, Request, Response, urlencoded }  from "express";
import cors from "cors";
import router from "./app/routes";
import { globalErrorHendlar } from "./app/middlewares/globalerrorHendlar";
import { notFount } from "./app/middlewares/notFound";



const app: Application = express();
app.use(cors());

//use parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) =>{
    res.send("PH Helth Care Server....")
});

app.use("/api/v1", router);

app.use(globalErrorHendlar);

app.use(notFount);

export default app;