import {Router} from 'express';
import { formularioAuth, formularioRegistro, leccionesController, cerrarSesion } from '../controllers/home.js';
const router = Router();

router.get('/', leccionesController)

router.get('/auth', formularioAuth );

router.get('/signup', formularioRegistro );

router.post('/signout', cerrarSesion);

export default router;