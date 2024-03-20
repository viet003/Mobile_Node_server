import express from "express"
import * as authController from "../controllers/authController"
const router = express.Router()

// login and register...
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/getpass', authController.getPass)
router.put('/changepass', authController.changePass)
router.put('/setstate', authController.setState)

export default router
