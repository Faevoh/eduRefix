const AddStudent = require("../Models/addStudentModel");
const classModel = require("../Models/classModel")
const cloudinary = require("../Utils/cloudinary");
const emailSender = require("../Utils/email");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.newStudent = async(req,res)=>{
    try{
        const {studentName,email, password,regNumber,admissionYear, guardianPhoneNumber,DOB} = req.body;
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        const classNew = req.params.classId;
        const theClass = await classModel.findById(classNew)

        const data = {
            studentName,
            email,
            password: hash,
            regNumber,
            admissionYear,
            guardianPhoneNumber,
            DOB
        }
        const createNewUser = new AddStudent(data);
        const userToken = jwt.sign({
            id: createNewUser._id,
            password: createNewUser.password,
            // role: createNewUser.role
        }, process.env.JWT_TOKEN,{expiresIn: "1d"});

        createNewUser.token = userToken;
        createNewUser.classes = theClass
        await createNewUser.save();
        theClass.students.push(createNewUser);
        await theClass.save()

        // const userVerify = `${req.protocol}://${req.get("host")}/api/verifyStudent/${createNewUser._id}`;
        const message = `You have been registered as New User in the Eduglobal Application.
        Thank you for registering with our app.`
        emailSender({
            email: createNewUser.email,
            subject: "Kindly Verify your account",
            message,
        });

        res.status(201).json({
            message: "New Student Added",
            // data: createNewUser
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.confirmVerified = async(req,res)=>{
    try{
        const id = req.params.studentid;
        
        const user = await AddStudent.findById(id)
       
        await AddStudent.findByIdAndUpdate(
            user._id,
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
};    
exports.getAllStudents = async(req,res)=>{
    try{
        const allStudents = await AddStudent.find();
        res.status(201).json({
            message: "All Students",
            length: allStudents.length,
            data: allStudents
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};
exports.AllStudentsperClass = async(req,res)=>{
    try{
        const allStudents = await AddStudent.find().populate("classes");
        res.status(201).json({
            message: "All Students",
            length: allStudents.length,
            data: allStudents
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};
exports.deleteStudents = async(req,res)=>{
    try{
        const studentid = req.params.studentid
        await AddStudent.findByIdAndDelete(studentid);
        res.send  ("Successfully Deleted")
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};
exports.studentLogin = async(req,res) => {
    try{
        const {email} = req.body
        const check = await AddStudent.findOne({ email: email}); 
        if(!check) return res.status(404).json({message: "Not Found"});
        const IsPassword = await bcryptjs.compare(req.body.password, check.password)
        if(!IsPassword) return res.status(404).json({message: "Email or Password incorrect"});
        if(!check.isStudent) return res.status(400).json({message: "You are not a student, you cannot login"});

        const myToken = jwt.sign({
            id: check._id,
            password: check.password,
            role: check.role
        }, process.env.JWT_TOKEN,{ expiresIn: "1d"});

        check.token = myToken
        await check.save();

        console.log(check.isStuden)
     const{password,...others} = check._doc
        
        res.status(201).json({
            message: "Successful",
            data: others
        });
     }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};