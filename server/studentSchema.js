import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
        required: true,
    },
    hobbies: {
        type: [String],
    },
    studentProfile: {
        type: String, // Assuming you store file paths or URLs
    },
});

export const Student = mongoose.model('Student', studentSchema);