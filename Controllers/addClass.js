const classModel = require("../Models/classModel");
const AddStudent = require("../Models/addStudentModel");
const AddTeacher = require("../Models/addTeacherModel");



exports.newClass = async(req,res)=>{
    try {
        const data = {nameOfClass,classBranch,monthlyTutionFees} = req.body
        
        // const studentId = req.params.id;
        // const Student = await AddStudent.findById(studentId);

        const createNew = await classModel.create(data);
        console.log(createNew)
        // createNew.students.push(Student);
        // createNew.save();
        // Student.classes.push(createNew)
        // await Student.save();
 
        res.status(201).json({
            message: 'New Class Created Sucessfully.',
            data:createNew
        })
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
}

exports.allClass = async(req, res)=>{
    try{
        // const addedClass = await classModel.find().populate("addStudent","addTeacher");
        const addedClass = await classModel.find().populate("students")

            res.status(201).json({
                classlength: addedClass.length,
                message: "All CLASSES",
                data: addedClass
            })
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}

exports.oneClass = async(req, res)=>{
    try{
        const id = req.params.classId
        const singleClass = await classModel.findById(id)
        if(!singleClass) {
            res.status(404).json({
                message: `No such Class`
            })
        }else{
            res.status(201).json({
                message: "A SINGLE CLASS.",
                data: singleClass
            })
        }
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}
exports.updateClass = async (req,res)=>{
    try{
        const id = req.params.classId;
        const updatedClass = await classModel.findByIdAndUpdate(id, req.body)
        if(!updatedClass ){
            res.status(404).json({
                message: `User doesnt exist`
            });
        }else{
            res.status(200).json({
                message: "Updated Successfully",
                data: updatedClass
            });
        }
    }catch(e){
        res.status(500).json({
            message: e.message
        });
    }
}
exports.deleteClass = async (req,res)=>{
    try{
        const id = req.params.classId;
        const removeClass = await classModel.findByIdAndRemove(id);
        
        if(!removeClass ){
            res.status(404).json({
                message: `NO such User`
            });
        }else{
            res.status(200).json({
                message: "Successfully deleted",
            });
        }
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}