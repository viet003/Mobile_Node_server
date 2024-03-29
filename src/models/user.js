'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.product, {
        through: 'favorite',
        foreignKey: 'userid', // Tên cột khóa ngoại của mô hình student trong bảng trung gian
        otherKey: 'productid', // Tên cột khóa ngoại của mô hình topic trong bảng trung gian
      })
      
      user.hasOne(models.info, {
        foreignKey: 'userid',
        as: 'user_info'
      })

      user.hasMany(models.comment, {
        foreignKey: 'userid', // Tên trường trong bảng svAccount lưu khóa ngoại
        as: 'commentbyuser' // Bí danh cho mối quan hệ
      });
    }
  }
  user.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};