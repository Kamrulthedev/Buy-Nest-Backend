import  express, { Application, NextFunction, request, Request, Response, urlencoded }  from "express";
import cors from "cors";
import router from "./app/routes";



const app: Application = express();
app.use(cors());

//use parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) =>{
    res.send("PH Helth Care Server....")
});

app.use("/api/v1", router);

app.use((err : any, req: Request, res: Response , next : NextFunction) =>{
      res.status(200).json({
        success : false,
        message : err.name || "Someting Went Wrong!",
        error : err
      })
});

export default app;