import express from "express"
require('dotenv').config()
import cors from "cors"
import initRoutes from "./src/routes"
import ConnectDB from "./src/config/connectDB"


const app = express()
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ["POST", 'GET', 'PUT', "DELETE"]
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
ConnectDB()

const port = process.env.PORT || 2025
const listener = app.listen(port, () => {
    console.log(`Server is running on ${listener.address().port}.....`)
})
