import { Sequelize } from 'sequelize';

const db = new Sequelize('usuarios','root', 'diosmeprotege1234', {
    host:    'localhost',
    dialect: 'mysql',
});

export default db;