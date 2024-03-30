import * as orderService from "../services/orderService"

// insert order
export const insertOrder = async (req, res) => {
    const {userid, productid, infoid, count, totalprice, size } = req.body;
    try {
        if (!userid || !productid || !infoid || !count || !totalprice || !size) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await orderService.insertOrderService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/register"
        })
    }
}

// log, unlock
export const setState = async (req, res) => {
    console.log(req.body)
    const { id, state } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await orderService.stateOrderService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/state"
        })
    }
}
// get order
export const getOrders = async (req, res) => {
    const { userid } = req.body
    try {
        const rs = userid ? await orderService.getOrderServicebyUser(req.body) : orderService.getOrderServicebyAd();
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/getorder"
        })
    }
}

