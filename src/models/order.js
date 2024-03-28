'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order.belongsTo(models.product, {
        foreignKey: 'productid',
        as: 'product_order'
      });
    }
    
    
  }
  order.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    productid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};