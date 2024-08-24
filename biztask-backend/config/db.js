import mongoose from "mongoose";
import "dotenv/config";
const mongodbURL=process.env.MONGODB_URL;
 const connectDB=async()=>{
       await mongoose.connect(mongodbURL).then(()=>{
            console.log("Database connected");
        });
}
export default connectDB;