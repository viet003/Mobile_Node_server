import express from "express"
import * as authController from "../controllers/authController"
import * as productController from "../controllers/productController"
import { insertProduct } from './../controllers/productController';

const router = express.Router()

// login and register...
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/getpass', authController.getPass)
router.put('/changepass', authController.changePass)
router.post('/setstate', authController.setState)
router.get('/getaccount', authController.getAccount)
router.delete('/deleteaccount', authController.deleteAccount)

//product
router.get('/getproduct', productController.getProduct)
router.post('/insertproduct', productController.insertProduct)
router.put('/updateproduct', productController.updateProduct)
router.delete('/deleteproduct', productController.deleteProduct)


export default router
