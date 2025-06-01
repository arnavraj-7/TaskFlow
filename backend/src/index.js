import express from 'express';
import dotenv from 'dotenv';
import connectDB from './controllers/db.controller.js';
import cors from 'cors'
import todosRoutes from './routes/todos.routes.js'; 
dotenv.config();
const app=express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/api/todos', todosRoutes);
app.get('/api/init',(req,res)=>{
    res.status(200).json({message:"Server is up and running"})
})
const PORT=process.env.PORT || 5000;
connectDB().then(()=>{
    app.listen(PORT,(res,req)=>{
    console.log(`env is getting read:${process.env.FRONTEND_URL}`)
    console.log(`Server is listening on ${PORT}`)
})
}).catch((error)=>{
    console.log(`Error occured: ${error}`);
})
