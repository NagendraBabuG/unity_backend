const express = require('express')
const cors = require('cors')
const connectDB = require('./utils/db')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()

const authRoutes = require('./routes/auth')
const buyerRoutes = require('./routes/buyer')
const sellerRoutes = require('./routes/seller')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/buyer', buyerRoutes)

app.use('/api/seller', sellerRoutes)


const PORT = process.env.PORT || 3000

connectDB(process.env.DB_URL)

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})

