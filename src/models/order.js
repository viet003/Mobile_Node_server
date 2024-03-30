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
        as: 'productorder'
      });

      order.belongsTo(models.info, {
        foreignKey: 'infoid',
        as: 'infoorder'
      });
    }
    
    
  }
  order.init({
    userid: DataTypes.STRING,
    productid: DataTypes.INTEGER,
    infoid: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    totalprice: DataTypes.INTEGER,
    size: DataTypes.STRING,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};