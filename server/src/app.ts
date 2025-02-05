import express, { json, static as _static } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import settings from './config/settings';
import globalExceptionHandler from './middleware/globalExceptionHandler';
import router from './routes';

const app = express();
export const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://77.37.124.96:8081',
    'https://patient.ng/',
    'https://patient.ng',
    'https://patient.ng:8083/',
    'https://patient.ng:8083',
    'https://www.patient.ng/',
    'https://www.patient.ng',
    'https://www.patient.ng:8083/',
    'https://www.patient.ng:8083',
    'https://admin.patient.ng/',
    'https://admin.patient.ng'
  ],
  credentials: true,
};

app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions)); //handle cors operations
app.use(json()); // Parse incoming requests data
app.use(morgan('dev')); //Route debugger
app.use('/uploads', _static(path.resolve('uploads')));

app.use(`${settings.service.apiRoot}`, router); //All routes middleware

app.use(globalExceptionHandler); //Handle error globally

export default app;
