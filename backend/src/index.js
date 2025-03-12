import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cohereRouter from './routes/CohereRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;


app.use('/story', cohereRouter);

app.listen(port);