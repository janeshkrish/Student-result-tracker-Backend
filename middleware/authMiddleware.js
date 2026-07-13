const jwt = require(jsonwebtoken);
const user = require('../models/User');

const protect = async(req,res,next) => {
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await user.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.log('Token verification failed : ',error.message);
            res.status(401).json({Message : "Authorization is failed"});
        }
    } 
    if (!token){
        res.status(401).json({Message : "Not authorization,No token is provided"});
    }
};
module.exports = {protect};