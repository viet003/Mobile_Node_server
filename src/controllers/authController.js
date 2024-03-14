import * as authService from "../services/authService"

// đăng ký
export const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs1 = await authService.registerService(req.body)
        return res.status(200).json(rs1)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth controller!/register"
        })
    }
}
// đăng nhập
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.loginService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth controller!/login",
        })
    }
}
// đổi mật khẩu
export const changePass = async (req, res) => {
    const { email, password, newpassword } = req.body;
    try {
        if (!email || !password || !newpassword) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.changePassService(req.body)
        return res.status(200).json(rs)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth controller!/changePass"
        })
    }
}
// lấy lại mật khẩu
export const getPass = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.getPassService(req.body)
        return res.status(200).json(rs)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth controller!/getPass"
        })
    }
}