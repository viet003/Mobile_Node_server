'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('infos', { 
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('infos');
    }
};
