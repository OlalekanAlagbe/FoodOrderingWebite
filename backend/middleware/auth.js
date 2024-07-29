import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false,message:"Not authorized, Please login"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode
        // console.log(req.body.userId)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Something went wrong"})
    }
}

export default authMiddleware;