import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//Placing user order for frontend

const placeOrder = async (req,res) => {

    console.log(req.body)
    // const frontend_url = "http://localhost:5173"

    if(req.body.items.length==0){
       return res.json({success:false,message:"Cannot order when no item has been selected" })
    }
    try {
        const newOrder = new orderModel({
            userId:req.body.userId.id,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        console.log(newOrder)
       const order = await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId.id,{cartData:{}});
        res.json({success:true,message:"Orders placed successfully" })

    } catch (error) {
        // console.log(error)
        res.json({success:false,message:"Something went wrong, please try again"})
    }
}

const verifyOrder = async (req,res) => {
    console.log(req.body)
     const {orderId,success} = req.body;
     try {
         if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Order verified"})
        }else{
             await orderModel.findByIdAndDelete(orderId);
             res.json({success:true,message:"Order deleted"})

         }
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"})
     }
}


//Users orders for frontend

const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId.id});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong, Please try again"})
    }
}

//Listing orders for admin for panel

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        res.json({success:false,message:"Something went wrong"})
    }
}


//API for updating order status

const updateStatus = async (req,res) => {
    try {

        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Something went wrongx"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}