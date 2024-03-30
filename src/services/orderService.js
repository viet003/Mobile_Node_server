import db from "../models"

//get all orderby user
export const getOrderServicebyUser = async ({ userid }) => {
    try {
        const response = await db.order.findAll({
            include: [
                {
                    model: db.product,
                    as: 'productorder',
                }
            ],
            where: { userid },
        });
        console.log(response)
        return response;
    } catch (error) {
        throw (error)
    }
}

//get all orderby admin
export const getOrderServicebyAd = async () => {
    try {
        const response = await db.order.findAll({
            include: [
                {
                    model: db.product,
                    as: 'productorder',
                }
            ]
        });
        return response;
    } catch (error) {
        throw (error)
    }
}

// insert order
export const insertOrderService = async ({ userid, productid, infoid, count, totalprice, size }) => {
    try {
        const check = await db.info.findOne({
            where: { userid }
        })
        if (check) {
            const response = await db.order.create({
                userid: userid,
                productid: productid,
                infoid: infoid,
                count: count,
                totalprice: totalprice,
                size: size,
            });
            return ({
                err: response ? 0 : 2,
                msg: response ? 'Thêm thành công!' : 'Không thành công.',
                //token: token || null
            });
        } else {
            return {
                err: 2,
                msg: 'Không tìm thấy thông tin giao hàng'
            }
        }
    } catch (error) {
        throw (error)
    }
}

// update order
export const stateOrderService = async ({ id, state }) => {
    try {
        const response = await db.order.update({
            state: state
        }, { where: { id } });
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
        const response = await db.product.destroy({ where: { id } });
        return ({
            err: response ? 0 : 2,
            msg: response ? 'Xóa thành công!' : 'Không thành công.',
            //token: token || null
        });
    } catch (error) {
        throw (error)
    }
}