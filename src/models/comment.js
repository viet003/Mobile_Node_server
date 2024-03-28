'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.product, {
        foreignKey: 'productid',
        as: 'comments'
      });
      comment.belongsTo(models.user, {
        foreignKey: 'userid',
        as: 'commentbyuser'
      });
    }
    
    
  }
  comment.init({
    productid: DataTypes.INTEGER,
    userid: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};