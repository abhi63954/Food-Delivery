import cloudinary from "../config/cloudinary.js";
import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item

const addFood = async (req, res) => {

  const image=req.file
     let imageUrl;
     if(image){
        const imageUpload=await cloudinary.uploader.upload(image.path,{resource_type:'image'});
         imageUrl=imageUpload.secure_url;
    }

  const food = new foodModel({
    name:req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageUrl
  })
  try{
    await food.save();
    // console.log(food.data);
    
    res.json({success:true, message:"Food Added"})
  }catch(error){
    console.log(error);  
    res.json({success:false, message:"Error"})  
  }
}

// All Food list:
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({success: true, data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}


// Remove Food Item:
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})


    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true, message:"Food Removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}

export {addFood, listFood, removeFood}