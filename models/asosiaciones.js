import Leccion from './Leccion.js'
import Temario from './Temario.js'
import Cuestionario from './Cuestionario.js'
import Pregunta from './Pregunta.js'
import Opcion from './Opcion.js'


Temario.belongsTo(Leccion, {foreignKey: 'id_leccion'})

Cuestionario.hasMany(Pregunta, {foreignKey: 'id_cuestionario'})

Pregunta.belongsTo(Cuestionario, {foreignKey: 'id_cuestionario'})

Pregunta.hasMany(Opcion, {foreignKey: 'id_pregunta'})

Opcion.belongsTo(Pregunta, {foreignKey: 'id_pregunta'})



export {
    Temario,
    Leccion,
    Cuestionario,
    Pregunta,
    Opcion
}