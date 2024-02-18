import express from 'express';
import path from 'path';
import cors from 'cors';
import authRoute from "../server/Routes/Auth.js"
import promptRoute from "../server/Routes/Prompt.js"
	
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/prompt", promptRoute);

app.listen(5000,()=>{
    console.log('server is running on port 5000');
});