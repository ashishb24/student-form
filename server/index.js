import express from "express";
import mongoose from "mongoose";
import { registerStd ,getAllRecord} from "./controller/registerStd.js";
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

const connectToDatabase = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb://127.0.0.1:27017/test");
        console.log(`DataBase connected with ${connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));


connectToDatabase();

app.listen(5000, () => {
    console.log('server is working');
});

app.route('/register').post(registerStd);
app.route('/allrecords').get(getAllRecord);