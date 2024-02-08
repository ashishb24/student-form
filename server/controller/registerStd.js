import { Student } from "../studentSchema.js";
export const registerStd = async (req, res) => {
    try {
        const { studentName, mobileNo, city, cast, hobbies } = req.body;

        // Basic validation
        if (!studentName || !mobileNo || !cast || !hobbies) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Additional conditions for specific fields
        if (mobileNo.length !== 10 || !/^\d+$/.test(mobileNo)) {
            return res.status(400).json({ error: 'Invalid mobile number.' });
        }

        // Create a new student instance
        const newStudent = await Student.create({
            studentName,
            mobileNo,
            city,
            cast,
            hobbies,
        });

        // Respond with the saved student data
        res.json(newStudent);
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(400).json({ error: error.message });
    }
}

export const getAllRecord = async (req, res) => {
    try {
        const records = await Student.find({});

        if (!records) {
            return res.status(404).json("no records")
        }

        res.status(200).json({
            success: true,
            records
        })
    } catch (error) {
        console.log(error);
    }
}