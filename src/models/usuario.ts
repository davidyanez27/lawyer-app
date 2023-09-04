import { DataTypes } from "sequelize";
import db from "../db/connection";

const Usuario = db.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    fecha:{
        type: DataTypes.DATE
    },
    idRol:{
        type: DataTypes.INTEGER
    },activo:{
        type: DataTypes.BOOLEAN
    },
    
});

export default Usuario;