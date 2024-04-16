import Leccion from './Leccion.js'
import Temario from './Temario.js'

Temario.belongsTo(Leccion, {foreignKey: 'id_leccion'})

export {
    Temario,
    Leccion
}