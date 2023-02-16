const jwt = require("jsonwebtoken")
const adminModel = require("../Models/adminModel");
const teacherModel = require("../Models/addTeacherModel");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});

const isSignIn = async (req,res,next)=>{
    const userId = req.params.userId
    const user = await adminModel.findById(userId)

    if(!user) return res.status(404).json({message: "you are not admin"});

    const Token = user.token

    if(!Token) return res.status(403).json({message: "you are not authenticated"});
    
    jwt.verify(Token, process.env.JWT_TOKEN, (err, payload)=>{
        if(err) return res.status(403).json({message: "token is not valid!"});

        req.User = payload
        next()
    })
};

const roleAuth = async(req,res,next)=>{
    isSignIn (req,res, ()=>{
        if(req.User.isAdmin ){
            next()
        }else{
                res.status(403).json({
                    message: "you are not an admin"
                });
        }
    });
};

const IsTeachers = async (req,res,next)=>{
    const userId = req.params.userId
    const user = await teacherModel.findById(userId)

    if(!user) return res.status(404).json({message: "you are not a teacher"});

    const Token = user.token

    if(!Token) return res.status(403).json({message: "you are not authenticated"});
    
    jwt.verify(Token, process.env.JWT_TOKEN, (err, payload)=>{
        if(err) return res.status(403).json({message: "token is not valid!"});

        req.User = payload
        next()
    })
};

const teacherAuth = async(req,res,next)=>{
    IsTeachers (req,res, ()=>{
        if(req.User.isTeacher){
            next()
        }else{
                res.status(403).json({
                    message: "you are not a teacher"
                });
        }
    });
};
module.exports = {
    roleAuth,
    teacherAuth

}