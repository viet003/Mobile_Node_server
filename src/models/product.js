'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            product.belongsToMany(models.user, {
                through: 'cart',
                foreignKey: 'productid', // Tên cột khóa ngoại của mô hình student trong bảng trung gian
                otherKey: 'userid', // Tên cột khóa ngoại của mô hình topic trong bảng trung gian
            })
            product.hasMany(models.order, {
                foreignKey: 'productid',
                as: 'product_order'
            })
            product.hasMany(models.comment, {
                foreignKey: 'productid', // Tên trường trong bảng svAccount lưu khóa ngoại
                as: 'comments' // Bí danh cho mối quan hệ
            });
        }
    }
    product.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        stars: DataTypes.STRING,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'product',
    });
    return product;
};