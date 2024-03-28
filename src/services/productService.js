import db from "../models"

//get all product
export const getProductService = async () => {
    try {
        const response = await db.product.findAll({
            attribbutes: ['name','description','stars','price','image']
        });
        return response;
    } catch (error) {
        throw (error)
    }
}

// insert product
export const insertProductService = async ({ name, description, stars, price, image }) => {
    try {
        const response = await db.product.create({
            name, description, stars, price, image
        });
        return ({
            err: response ? 0 : 2,
            msg: response ? 'Thêm thành công!' : 'Không thành công.',
            //token: token || null
        });
    } catch (error) {
        throw (error)
    }
}

// update product
export const updateProductService = async ({ id, name, description, stars, price, image }) => {
    try {
        const response = await db.product.update({
            name: name,
            description: description,
            stars: stars,
            price: price,
            image: image
        }, { where : {id}});
        return ({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật thành công!' : 'Không thành công.',
            //token: token || null
        });
    } catch (error) {
        throw (error)
    }
}


// delete product
export const deleteProductService = async ({ id }) => {
    try {
        const response = await db.product.destroy({ where : {id}});
        return ({
            err: response ? 0 : 2,
            msg: response ? 'Xóa thành công!' : 'Không thành công.',
            //token: token || null
        });
    } catch (error) {
        throw (error)
    }
}