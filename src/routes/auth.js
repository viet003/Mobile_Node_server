import express from "express"
import * as authController from "../controllers/authController"
import * as productController from "../controllers/productController"
import * as informationController from "../controllers/informationController"
import * as commentController from "../controllers/commentController"

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

// information
router.post('/getinformation', informationController.getInformation)
router.post('/insertinformation', informationController.insertInformation)

// comment
router.get('/getcomment', commentController.getComment)
router.post('/insertcomment', commentController.insertComment)
router.delete('/deletecomment', commentController.deleteComment)

// order

export default router
