const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mobiledb', 'root', 'Viet211003@s', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});


const ConnectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default ConnectDB