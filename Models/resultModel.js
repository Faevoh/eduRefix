const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ResultSchema = new mongoose.Schema({
    studentName: [{
        type: Schema.Types.ObjectId,
        ref: "addStudent",
        required: [true, "Student Name is required" ]
    }],
    currentSchoolTerm: {
        type: String,
        required: [true, "Current School Term is required" ]
    },
    resultImage: {
        type: String,
        required: [true, "Result Image is required" ]
    }
},{
    timestamps: true
});

const ResultModel = mongoose.model("Results", ResultSchema)

module.exports = ResultModel