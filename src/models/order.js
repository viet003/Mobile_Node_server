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

      order.belongsTo(models.info, {
        foreignKey: 'infoid',
        as: 'info_order'
      });
    }
    
    
  }
  order.init({
    productid: DataTypes.INTEGER,
    infoid: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    totalprice: DataTypes.INTEGER,
    size: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};