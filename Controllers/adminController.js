const AdminSchema = require("../Models/adminModel");
const emailSender = require("../Utils/email");
const cloudinary = require("../Utils/cloudinary");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.newAdmin = async(req,res)=>{
    try{
        const {nameOfSchool,email, password,phoneNumber,schoolImage,address,targetLine,website,country} = req.body;
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            nameOfSchool,
            phoneNumber,
            address,
            targetLine,
            website,
            country,
            schoolImage,
            email,
            password: hash
        }
        const createNewUser = new AdminSchema(data);
        // console.log(createNewUser)
        const userToken = jwt.sign({
            id: createNewUser._id,
            password: createNewUser.password,
            isAdmin: createNewUser.isAdmin
        }, process.env.JWT_TOKEN,{expiresIn: "1d"});

        createNewUser.token = userToken;
        await createNewUser.save();

        const userVerify = `${req.protocol}://${req.get("host")}/api/userVerify/${createNewUser._id}`;
        const pageUrl = `${req.protocol}://${req.get("host")}/edu-global.onrender.com/#/verify/${createNewUser._id}`
        const message = `Thank you for registering with our app. Please click this link ${pageUrl} to verify your account`
        emailSender({
            email: createNewUser.email,
            subject: "Kindly Verify your account",
            message,
        });

        res.status(201).json({
            message: "User Created",
            data: createNewUser
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.confirmVerify = async(req,res)=>{
    try{
        const id = req.params.id;
        
        const user = await AdminSchema.findById(id)
       
        await AdminSchema.findByIdAndUpdate(
            user.id,
            {
                isVerified : true
            },
            {
                new: true
            }
        )

        res.status(201).json({
            message: "You have been verified"
        });
    }catch(e){
        res.status(400).json({
        message: e.message
       });
    }
}    
exports.adminLogin = async(req,res) => {
    try{
        const {email} = req.body
        const check = await AdminSchema.findOne({ email: email}); 
        if(!check) return res.status(404).json({message: "Not Found"});
        const IsPassword = await bcryptjs.compare(req.body.password, check.password)
        if(!IsPassword) return res.status(404).json({message: "Email or Password incorrect"});

        const myToken = jwt.sign({
            id: check._id,
            password: check.password,
            isAdmin: check.isAdmin
        }, process.env.JWT_TOKEN,{ expiresIn: "1d"});

        check.token = myToken
        await check.save();
        
     const{password,...others} = check._doc

        res.status(200).json({
            message: "Successful",
            data: others
        });
    //  console.log(others)

     }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};
exports.updateProfile = async(req,res)=>{
    try{
        const id = req.params.userid;
        const userId = await AdminSchema.findById(id);
        // console.log(userId)

        const {nameOfSchool,phoneNumber,address,targetLine,website,country,schoolImage} = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);
        const data ={
         nameOfSchool,
         phoneNumber,
         address,
         targetLine,
         website,
         country,
         schoolImage: result.secure_url,
         cloudId: result.public_id
       }
       
        const updatedProfile = await AdminSchema.findByIdAndUpdate(userId, data)
        
        res.status(201).json({
            message: "Successfully Updated Profile",
            data: updatedProfile
        });
        
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};
exports.getAllAdmin = async(req,res)=>{
    try{
        const allAdmin = await AdminSchema.find();
        res.status(201).json({
            message: "All Admin",
            length: allAdmin.length,
            data: allAdmin
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};
exports.adminLogOut = async(req,res)=>{
    try{
        const Adminlogout = await AdminSchema.findById(req.params.adminId);
        const myToken = jwt.sign({
            id: Adminlogout._id,
            password: Adminlogout.password,
            isAdmin: Adminlogout.isAdmin
        }, process.env.JWT_DESTROY,{ expiresIn: "5mins"});
        Adminlogout.token = myToken;
        await Adminlogout.save();
        res.status(200).json({
            message: "Successfully Logged Out"
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};
// exports.Forgotpassword = async (req, res) => {
//     try{
//         const {email} = req.body
//         const userEmail = await Students.findOne({email})
//         if(!userEmail) return  res.status(404).json({ message: "No Email" })
//         const myToken = jwt.sign({
//             id:userEmail._id,
//             role:userEmail.role}, process.env.JWT_TOKEN, {expiresIn: "5m"})

//         const VerifyLink = `${req.protocol}://${req.get("host")}/api/forgotPassword/${userEmail._id}/${myToken}`
//         const message = `Use this link ${VerifyLink} to reset your password. 
//         This link expires in 5 minutes`;
//         emailSender({
//           email: userEmail.email,
//           subject: "Reset Pasword",
//           message,
//         })
        
//         res.status(202).json({
//             message:"email have been sent"
//         })

//         // console.log(userEmail);
//     }catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }
// };
// exports.resetpassword = async (req, res) => {
//     try {
//         const {password} = req.body
//         const id = req.params.id
//         const passwordchange = await Students.findById(id)
//         const salt = bcryptjs.genSaltSync(10);
//         const hash = bcryptjs.hashSync(password, salt);

//         await Students.findByIdAndUpdate(passwordchange._id,{
//             password: hash
//         },{new: true})

//         res.status(202).json({
//             message:"password updated"
//         })

//     } catch (err) {
//         res.status(400).json({
//             message:err.message
//         })
//     }
// }