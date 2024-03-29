import * as commentService from "../services/commentService"

// get all comment
export const getComment = async (req, res) => {
    const { productid } = req.body
    try {
        if(!productid) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await commentService.getAllCommentsService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/getcomment"
        })
    }
}


// inert comment
export const insertComment = async (req, res) => {
    const { productid, userid, content } = req.body;
    try {
        if (!productid || !userid || !content) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await commentService.insertComment(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/insertcomment"
        })
    }
}

// delete product
export const deleteComment = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await commentService.deleteCommentService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/deletecomment"
        })
    }
}