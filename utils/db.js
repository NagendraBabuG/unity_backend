const mongoose = require('mongoose')

mongoose.set('strictQuery', true)


const connectDB = async (url) =>{
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Database Connected...`)
    }
    catch(error)
    {
        console.log(`error, ${error.message}`)
    }
}


module.exports = connectDB