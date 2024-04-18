import { emailRegistro } from "../helpers/emails.js";
import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'
import { generarJWT, generateId } from "../helpers/tokens.js";
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import { Leccion } from '../models/asosiaciones.js'



//Autenticacion del usuario
const autenticar = async (req = request, res = response) => {
    try {
        //Validacion 
        await check('email').isEmail().withMessage('Correo no valido').run(req);
        await check('password').notEmpty().withMessage('Contraseña obligatoria').run(req);
        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                errores: errores.array()
            });
        }

        //Extraer datos
        const { email, password } = req.body;

        //Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no existente"
            })
        }

        //Verificar si el usuario confirmo su cuenta
        if (!usuario.confirmado) {
            return res.status(404).json({
                msg: "Esta cuenta no esta confirmada"
            })
        }

        //Revisar password
        if (!usuario.verificarPassword(password)) {
            return res.status(401).json({
                msg: "La contraseña es incorrecta"
            })
        }

        //Autenticar usuario
        const token = generarJWT(usuario.id_usuario);

        //Almacenar en un cookie
        res.cookie('_token', token, {
            httpOnly: true,
            //secure: true
        })

        const id_usuario =usuario.id_usuario

        await Usuario.update({
            autenticado: true
        }, {
            where: { email }
        })

        const isAuthenticated = true;
        const lecciones = await Leccion.findAll();

        res.render('index', {
            lecciones: lecciones,
            isAuthenticated: isAuthenticated,
            id_usuario
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ocurrió un error al intentar autenticar'
        });
    }
}

const registroUsuario = async (req, res) => {
    try {
        await check('name').notEmpty().withMessage('Nombre no valido').run(req);
        await check('email').isEmail().withMessage('Correo no valido').run(req);
        await check('password').notEmpty().withMessage('Contraseña no valido').run(req);

        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                errores: errores.array()
            });
        }

        const { name, email, password } = req.body;

        console.log(name, email, password);
        //Verificar que no haya duplicados
        const existeUsuario = await Usuario.findOne({ where: { email } });
            if (existeUsuario) {
                return res.render('alertas', {
                    mensaje: "Este usuario ya existe"
                });
        }

        const usuario = await Usuario.create({
            id_usuario: generateId(),
            email,
            password,
            nombre: name,
            token: generateId()
        });

        //Envia email de confirmacion
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token,
        });



        return res.render('alertas', {
            mensaje: "Hemos enviado un correo de confirmacion!"
        });


    } catch (error) {
    
    }
}

const confirmarCuenta = async (req, res) => {
    const { token } = req.params

    //Verificar si el token es valido
    const usuario = await Usuario.findOne({ where: { token } });
    if (!usuario) {
        return res.render('alertas', {
            mensaje: "Token no válido:("
        });
    }


    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save(); //Guarda los datos modificados anteriormente

    return res.render('alertas', {
        mensaje: "Cuenta confirmada!, ya puede iniciar sesion"
    });
}

export {
    registroUsuario,
    confirmarCuenta,
    autenticar
}