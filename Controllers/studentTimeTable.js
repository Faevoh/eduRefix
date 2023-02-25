const studentTimeTable = require("../Models/studentTimeTableModel");
const cloudinary = require("../Utils/cloudinary");

exports.addImage = async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(
            req.files.timetableImage.tempFilePath,{folder:"timetableImage"},
         (err, timetableImage) => {
           try {
             return timetableImage;
           } catch (err) {
             return err;
           }
         }
       );
        const Data = {
            timetableImage: {
                public_id:result.public_id,
                url:result.secure_url
            }
        }
        const timetable = await studentTimeTable.create(Data);
        res.status(201).json({
            message: "New timetable has been created",
            data: timetable
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}