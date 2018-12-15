const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Email/Password salah"
            })
        }    
    } catch (err){
        return next({
                status: 400,
                message: "Email/Password salah"
        })
    }
    
}

exports.signup = async function(req, res, next){
    try{
        let user = await db.User.create(req.body);
        let { id, username} = user;
        let token = jwt.sign({
                id,
                username
            },
            process.env.SECRET_KEY
        ); 
        return res.status(200).json({
            id,
            username,
            token
        })
    } catch(err){
        if(err.code === 11000){
            err.message = "Username atau E-Mail sudah dipakai."
            
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}