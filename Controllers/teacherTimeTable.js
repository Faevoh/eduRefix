// const teacherTimeTable = require("../Models/teacherTimeTableModel");
// const teacherModel = require("../Models/addTeacherModel")
// const cloudinary = require("../Utils/cloudinary");

// exports.addImage = async(req,res)=>{
//     try{
//         const newTimetable = req.params.teacherId;
//         const Timetable = await teacherModel.findById(newTimetable);
//         // console.log(Timetable)
//         const result = await cloudinary.uploader.upload(
//             req.files.timetableImage.tempFilePath,{folder:"timetableImage"},
//          (err, timetableImage) => {
//            try {
//              return timetableImage;
//            } catch (err) {
//              return err.message;
//            }
//          }
//        );
//         const Data = {
//             timetableImage: {
//                 public_id:result.public_id,
//                 url:result.secure_url
//             }
//         }
//         const timetable = await teacherTimeTable.create(Data,Timetable);
//         await teacherTimeTable.save();
//         console.log(timetable)
       
//         res.status(201).json({
//             message: "New timetable has been created",
//             data: timetable
//         });
//     }catch(e){
//         res.status(400).json({
//             message: e.message
//         });
//     }
// }