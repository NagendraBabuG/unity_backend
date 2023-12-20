const jwt = require('jsonwebtoken')
require('dotenv').config()


const decodeToken = async (req, res, next)=>{
    if(!req.headers) return res.json({message : 'missing header'})
	if(!req.headers.authorization) return res.json({message : 'missing header'}) 
	const token = req.headers.authorization.split(' ')[1]
	if(!token) return res.json({message : 'missing header'})

    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
            if(error) return res.json({ message: 'Internal Error' });
            else{
                req['id'] = user.id;
                req['type'] = user.role
                //console.log('token ', user)
                return next()
            } 
        })
	}
	catch{
		
		return res.json({ message: 'Internal Error' });
	}
}

module.exports = decodeToken