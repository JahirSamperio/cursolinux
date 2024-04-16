import {Temario, Leccion} from '../models/asosiaciones.js'

const perfilLeccion = async (req, res) => {
    try {
        const { id_leccion } = req.params;

        const leccion = await Leccion.findOne({where: { id_leccion } });

        const temario = await Temario.findAll({where: { id_leccion } });
        res.render('profile-leccion', {
            temario: temario,
            leccion: leccion
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error en el servidor"
        })
    }
}

export {
    perfilLeccion
}
