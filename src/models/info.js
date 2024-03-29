'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        info.belongsTo(models.user, {
          foreignKey: 'userid',
          as: 'user_info'
        });
  
        info.hasMany(models.order, {
          foreignKey: 'infoid',
          as: 'info_order'
        })
      }
  }
  info.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    userid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'info',
  });
  return info;
};