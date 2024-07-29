import userModel from '../models/userModel.js'

//Add items to user cart

const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId.id})
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId.id,{cartData:cartData})
        res.status(201).json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Sonething went wrong, try again"})
    }
}

//Remove items from user cart

const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId.id)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId.id,{cartData})
        res.status(200).json({success:true,message:"Update successful"})
    } catch (error) {
        res.json({success:false,message:"Something went wrong, please try again."})
    }
}

//Fetch user cart data 

const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId.id)
        let userCartData = await userData.cartData
        res.status(200).json({success:true,userCartData:userCartData})
    } catch (error) {   
        res.json({success:false,message:"Something went wrong, please try again."})
    }
}


export {addToCart,removeFromCart,getCart}