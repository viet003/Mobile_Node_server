'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        favorite.belongsTo(models.user, {
          foreignKey: 'userid',
          as: 'user_favorite'
        });
        favorite.belongsTo(models.product, {
          foreignKey: 'productid',
          as: 'product_favorite'
        });
      }
  }
  favorite.init({
    userid: DataTypes.STRING,
    productid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};