import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://alagbeolalekan1000:alagbeolalekan11@cluster0.glzvad7.mongodb.net/food-del')
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}


