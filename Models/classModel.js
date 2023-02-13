const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new mongoose.Schema({
    nameOfClass: {
        type:String
    },
    classBranch: {
        type:  String
    },
    monthlyTutionFees: {
        type: String,
        required: true
    },
    selectClassTeacher: {
        type: String,
        required: true
    },
    students:[{
        type: Schema.Types.ObjectId,
        ref: "addStudents"
    }]
},{
    timestamps: true
});

const classModel = mongoose.model("addClass", classSchema);

module.exports = classModel