import jwt from "jsonwebtoken";
import User from "../models/models.js";
 
 export const verification=async(req,res,next)=>{
    try{
      const token = req.headers.authorization?.split(" ")[1]?.replace(/"/g, "").trim()||req.cookies.jwt;
    if(!token)
    {
        return res.status(400).json({message:"token not found"});

    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
  
    const user=await User.findById(decoded.userid);
      if(!user)
      {
       return  res.status(400).json({message:"no user"})
      }
      req.user=user;
    
    next();
      
 
   
     
      
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({message:"error occuresd in token"});
    }
 }
 export default verification;