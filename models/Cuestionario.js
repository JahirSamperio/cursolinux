import { DataTypes } from "sequelize";
import db from '../db/conexion.js'

const Cuestionario = db.define('cuestionario', {
    id_cuestionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Cuestionario;