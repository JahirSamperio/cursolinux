import Leccion from '../models/Leccion.js'

const lecciones = async (req, res) => {
    try {
        const lecciones = await Leccion.findAll();

        res.render('index'), {
            lecciones: lecciones
        }
        
    } catch (error) {
        return res.status(500).json({
            error: "Error en el servidor"
        })
    }
}

const formularioAuth = (req, res) => {
    res.render('auth'), {
        pagina: "Iniciar sesión"
    }
}

const formularioRegistro = (req, res) => {
    res.render('signup'), {
        pagina: "Crear cuenta"
    }
}

export {
    formularioAuth,
    formularioRegistro
}