import db from "../models";

export const getAllCommentsService = async ({ productidid }) => {
    try {
        const comments = await db.comment.findAll({
            where: {
                productid : id
            },
            include: [
                {
                    model: db.user,
                    as: 'commentbyuser',
                    attributes: ['name']
                }
            ]
        });

        return comments;
    } catch (error) {
        throw (error);
    }
};


// tạo comment
export const createCommentService = async ({ productid, userid, content }) => {
    try {
        const response = await db.comment.create({
            productid,
            userid,
            content
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công.'
        }
    } catch (error) {
        throw (error)
    }
}


// xóa comment
export const deleteCommentService = async ({ id }) => {
    try {
        const response = await db.comment.destroy({
            where: {
                id
            }
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công.'
        }
    } catch (error) {
        throw (error)
    }
}