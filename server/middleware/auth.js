require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Akses ditolak"
                })
            }
        })
        
    } catch (err){
        return next({ status: 401, message: "Akses ditolak"})
        
    }
    
}
exports.ensureCorrectUser = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id){
                return next();
            } else {
                console.log(decoded.id)
                return next({
                    status: 401,
                    message: "Akses tidak memungkinkan"
                })
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: "Akses tidak memungkinkan"
        })
    }
}