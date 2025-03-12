
import createtokenandsavecookies from"../jwt/generatetoken.js";
import  User from"../models/models.js";
import bcrypt from"bcrypt";
import jwt from"jsonwebtoken";
export const signup=async (req,res)=>{
    try{
    const{name,email,password,confirmpassword}=req.body;
    if(password!=confirmpassword)
    {
        return res.status(400).json({message:"pass donot match"});
    }
    const user= await User.findOne({email});
    if(user)
    {
        return res.status(400).json({message:"user already exist"});
    }
    const hashpass=await bcrypt.hash(password,10);
    const newuser= await new User({
        name,email,
        password:hashpass,
    });
   await newuser.save();
   if(newuser)
   {
   const token=createtokenandsavecookies(newuser._id,res);
    res.status(200).json({message:"user created successfully",   user: {
        _id: newuser._id,
        name: newuser.name,
        email: newuser.email,
      },token});
   }
}

catch(error){
 return res.status(400).json({error});
}
};
export const login=async(req,res)=>{
    try{
     const{email,password}=req.body;
     const user=await User.findOne({email});
     
     
     const ismatch=await bcrypt.compare(password,user.password)
     if(!user||!ismatch)
        
        {
          return  res.status(400).json("user not found or invalid pass");
        }
     const token=createtokenandsavecookies(user._id,res);
    
     return res.status(200).json({message:"user created successfully",user:{
        _id:user._id,email:user.email
     },token});
    }

    catch(error)
    {
        return res.status(400).json({message:"error"});
    }
};
export const logout=async(req,res)=>{
  try{
  res.clearCookie("jwt");
  res.json({ message: "user logged out succesfully"});
  }
  catch(error)
  {
      res.status(400).json({message:"error"});
  }
}
export const getuser=async (req,res)=>
{
 try{
    const loggedinuser=req.user._id;
    const alluser=await User.find({_id:{$ne:loggedinuser }}).select("-password");
    res.status(200).json({
     alluser
    });
 }
 catch(error){
    console.log("error in all user controoler"+error);
    res.status(400).json({message:"server error"})
 }
}
export const verifiedied=(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]?.replace(/"/g, "").trim();
    console.log("Received Token:", token);
    if(!token)
    {
        return res.status(400).json({message:"token not found"});
    }
    const decode =jwt.decode(token);
    
try{
  

    const decodedtoken=jwt.verify(token,process.env.JWT_SECRET);
  

   return  res.status(200).json({message:"token is valid"});
}
catch(error)
{
console.log("Error in token verification:", error);

   
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(400).json({ message: "Invalid token" });
}
}