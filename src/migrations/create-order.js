'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            productid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            infoid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }, 
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }, 
            totalprice: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            size: {
                type: Sequelize.STRING,
                allowNull: false
            },
            state:{
                type: Sequelize.BOOLEAN,
                allowNull: true
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
        await queryInterface.dropTable('orders');
    }
};