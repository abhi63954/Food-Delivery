import mongoose from "mongoose";

export const connect_db = async () => {
  await mongoose.connect(process.env.MONGODB_URL).then(()=>
    console.log("db connected")
  )
}