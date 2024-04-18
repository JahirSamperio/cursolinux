import express from 'express';
import homeRouter from './home.js'
import profileRouter from './profile-leccion.js'
import testRouter from './test.js'
import userRouter from './usuario.js'

const app = express();

app.use('/', homeRouter, userRouter)

app.use('/leccion', profileRouter)

app.use('/evaluacion', testRouter)

export default app;