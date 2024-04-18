import {Router} from 'express';
import { registroUsuario, confirmarCuenta, autenticar } from '../controllers/auth.js';
const router = Router();

router.post('/registro', registroUsuario);

router.get('/confirmar/:token', confirmarCuenta);

router.post('/login', autenticar);


export default router;