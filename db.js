import mongoose from 'mongoose';


mongoose.set('strictQuery', true);
const connectToMongo = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MONGODB YEAH!");
    } catch (error) {
        console.log("Error :",error);   
    }

}

export default connectToMongo;