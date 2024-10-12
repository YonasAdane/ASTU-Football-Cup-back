import express from "express";
import helmet from "helmet";
import 'dotenv/config';
import cors from "cors";
import { routes } from "./routes/route";
const app=express();
const PORT=process.env.PORT;
app.use(express.json())
app.use(cors())
app.use(helmet())
app.get("/",(req,res)=>{
    res.json({message:"welcome to ASTU FC"})
})
app.use('/api/v1',routes)
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})
export default app;