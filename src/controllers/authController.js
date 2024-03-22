import * as authService from "../services/authService"

// đăng ký
export const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs1 = role ? await authService.registerService(req.body) : await authService.registerService({ ...req.body, role: 'user' })
        return res.status(200).json(rs1)
    } catch (error) {
        return res.status(500).json({
            err: error,
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
            err: error,
            msg: "Fail at auth controller!/login",
        })
    }
}
// đổi mật khẩu
export const changePass = async (req, res) => {
    const { email, password, newpassword, role } = req.body;

    switch (role) {
        case 'admin':
            try {
                if (!email || !newpassword ) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Missing input data!"
                    })
                }
                const rs = await authService.changePassService(req.body)
                return res.status(200).json(rs)

            } catch (error) {
                return res.status(500).json({
                    err: error,
                    msg: "Fail at auth controller!/changePass"
                })
            }
        default:
            try {
                if (!email || !password || !newpassword || role) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Missing input data!"
                    })
                }
                const rs = await authService.changePassService(req.body)
                return res.status(200).json(rs)

            } catch (error) {
                return res.status(500).json({
                    err: error,
                    msg: "Fail at auth controller!/changePass"
                })
            }
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
            err: error,
            msg: "Fail at auth controller!/getPass"
        })
    }
}
// log, unlock
export const setState = async (req, res) => {
    console.log(req.body)
    const { id, isActive } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.stateService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/state"
        })
    }
}

// get account
export const getAccount = async (req, res) => {
    try {
        const rs = await authService.getAccountService()
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/state"
        })
    }
}

// delete account
export const deleteAccount = async (req, res) => {
    const { id } = req.body
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.deleteAccountService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json({
            err: error,
            msg: "Fail at auth controller!/state"
        })
    }
}