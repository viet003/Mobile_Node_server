'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        cart.belongsTo(models.user, {
          foreignKey: 'userid',
          as: 'user_cart'
        });
        cart.belongsTo(models.product, {
          foreignKey: 'productid',
          as: 'product_cart'
        });
      }
  }
  cart.init({
    userid: DataTypes.STRING,
    productid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};