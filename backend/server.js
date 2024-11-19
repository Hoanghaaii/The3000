import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv'
import mainRouter from '../backend/routers/index.router.js'
import { connectDB } from './db/connectDb.js';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.get('/api/ping', (req, res) => {
    res.status(200).json({ message: 'Pong' });
});

app.use('/api', mainRouter)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server running at ${PORT}`)
})

export default app