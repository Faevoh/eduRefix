const ResultModel = require("../Models/resultModel");
const StudentModel = require("../Models/addStudentModel");
const cloudinary = require("../Utils/cloudinary");

exports.uploadResult = async(req,res)=>{
    try{
        const studentid = req.params.studentid;
        const student = await StudentModel.findById(studentid);

        const result = await cloudinary.uploader.upload(
            req.files.resultImage.tempFilePath,{folder:"resultImage"},
         (err, resultImage) => {
           try {
             return resultImage;
           } catch (err) {
             return err;
           }
         }
       );
       const {currentSchoolTerm,resultImage} = req.body;
        const data = {
            currentSchoolTerm,
            resultImage: {
                public_id:result.public_id,
                url:result.secure_url
            }
        }
        const ResultUpload = new ResultModel(student, data);
        res.status(201).json({
            message: "Result Successfully Uploaded",
            data: ResultUpload
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};