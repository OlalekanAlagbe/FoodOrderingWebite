import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";



const foodRouter = express.Router()


//Image Storage Engine

const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})




foodRouter.post('/add',upload.single("image"),addFood) //To use this API, we have to use the endpoint http://localhost:4000/api/food/add
foodRouter.get('/list',listFood)
foodRouter.delete('/remove/:id',removeFood)

export default foodRouter; 