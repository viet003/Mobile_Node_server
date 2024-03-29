import * as informationService from "../services/informationService"

// get information
export const getInformation = async (req, res) => {
    const { userid } = req.body;
    try {
        if (!userid ) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await informationService.getInformationService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/insertinformation"
        })
    }
}

// inert information
export const insertInformation = async (req, res) => {
    const { userid, firstname, lastname, phone, address, city } = req.body;
    try {
        // if (!userid || !firstname || !lastname || !phone || !address || !city) {
        //     return res.status(400).json({
        //         err: 1,
        //         msg: "Missing input data!"
        //     })
        // }
        const rs = await informationService.insertInformationService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/insertinformation"
        })
    }
}
