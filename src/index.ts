import express from 'express';
import { router } from './routes';
import './database/connect';

const app = express();

app.use(express.json());
app.use(router);

export { app }