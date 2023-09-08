import { DataTypes } from "sequelize";
import db from "../db/connection";

const Usuario = db.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    idRol:{
        type: DataTypes.INTEGER
    },activo:{
        type: DataTypes.BOOLEAN
    },
    
});

export default Usuario;