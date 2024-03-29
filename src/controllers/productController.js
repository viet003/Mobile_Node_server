import * as productService from "../services/productService"

// get all product
export const getProduct = async (req, res) => {
    try {
        const rs = await productService.getProductService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/getproduct"
        })
    }
}


// inert product
export const insertProduct = async (req, res) => {
    const { name, description, stars, price, image } = req.body;
    try {
        if (!name || !description || !stars || !price || !image) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await productService.insertProductService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/insertproduct"
        })
    }
}

// update product
export const updateProduct = async (req, res) => {
    const { id, name, description, stars, price, image } = req.body;
    try {
        if (!id || !name || !description || !stars || !price || !image) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await productService.updateProductService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/updateproduct"
        })
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await productService.deleteProductService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/deleteproduct"
        })
    }
}