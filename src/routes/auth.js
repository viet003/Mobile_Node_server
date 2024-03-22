import express from "express"
import * as authController from "../controllers/authController"
const router = express.Router()

// login and register...
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/getpass', authController.getPass)
router.put('/changepass', authController.changePass)
router.post('/setstate', authController.setState)
router.get('/getaccount', authController.getAccount)
router.delete('/deleteaccount', authController.deleteAccount)


export default router
