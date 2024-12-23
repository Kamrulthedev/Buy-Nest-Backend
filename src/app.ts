import  express, { Application, Request, Response }  from "express";
import router from "./app/routes";
import { globalErrorHendlar } from "./app/middlewares/globalerrorHendlar";
import { notFount } from "./app/middlewares/notFound";
import cookieParser from 'cookie-parser'; 
const cors = require('cors');

const app: Application = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
// app.use(cors({ origin: ["https://buy-nest-delta.vercel.app"], credentials: true }));
app.use(cookieParser()); 

//use parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) =>{
    res.send("Welcome Buy Nest Server....")
});

app.use("/api/v1", router);

app.use(globalErrorHendlar);

app.use(notFount);

export default app;