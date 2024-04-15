import {Router} from 'express';
import { formularioAuth, formularioRegistro } from '../controllers/home.js';
const router = Router();

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/auth', formularioAuth );

router.get('/signup', formularioRegistro );

export default router;