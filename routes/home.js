import {Router} from 'express';
import { formularioAuth, formularioRegistro, leccionesController } from '../controllers/home.js';
const router = Router();

router.get('/', leccionesController)

router.get('/auth', formularioAuth );

router.get('/signup', formularioRegistro );


export default router;