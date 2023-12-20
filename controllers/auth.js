const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const cookieParser = require('cookie-parser')
const roles = require('../models/roles')
require('dotenv').config()

const signup = async (req, res) => {

    const { name, email, password, role } = req.body


    if (!name || !email || !password) return res.status(400).json({ error: "Enter name, email, password ..." })

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ error: 'User alreadys exists' })
        }

        const newPassword = await bcrypt.hash(password, 10)
        const userRole =  (role == 0) ? roles.buyer : roles.seller;
        const user = await User.create({
            name,
            email,
            password: newPassword,
            role : userRole
        })

        const token = jwt.sign({
            id: user._id, email : user.email, role : user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        })

        user.token = token
        user.password = undefined

        const options = {
            expires : new Date(Date.now() + 60*60*1000),
            httpOnly : true
        }


        res.status(201).json({success : true, user, 'token' : token})

    }
    catch (error) {

        return res.status(400).json(error)

    }
}






const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ error: "Invalid Credintails" })

    try {


        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error : "User doesn't exist"})


        if(user && (await bcrypt.compare(password, user.password)))
        {
            const token = jwt.sign({
                id: user._id, email : user.email, role : user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h"
            }
            )
            console.log(token)
        

           return res.status(201).json({'token' : token})



        }
        else{
            return res.status(400).json({error : 'Invalid Credintails'})
        }
    }
    catch (error) {

        return res.status(400).json(error)

    }
}

module.exports = {signup, login}