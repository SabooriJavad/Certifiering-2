import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './src/routes/user-router';
import {eventRouter } from './src/routes/event-router';


dotenv.config();

const app = express();
app.use('/user', (req, res, next) => {
    console.log('Middleware / user triggered:', req.method, req.path);
    next();
}, userRouter);
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/events', eventRouter);



    (async () => {
        await mongoose.connect(process.env.MONGODB_URI as string);
        const port = process.env.PORT || 8000;
        
        app.listen(port, () => {
            console.log(`Server running on the http://localhost:${port}`);
        })
    })();