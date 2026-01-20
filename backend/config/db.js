import mongoose from "mongoose";

export const connect_db = async () => {
  await mongoose.connect('mongodb+srv://kuwarbiabhishek:8439481968@cluster0.1gtcnhk.mongodb.net/food-delivery').then(()=>
    console.log("db connected")
  )
}