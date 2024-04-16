import express from 'express';
import homeRouter from './home.js'
import profileRouter from './profile-leccion.js'
const app = express();

app.use('/', homeRouter)

app.use('/leccion', profileRouter)

export default app;