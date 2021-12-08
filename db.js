import Sequelize from 'sequelize';
const sequelize = new Sequelize('djcity', 'root', '12341234', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

export default sequelize;