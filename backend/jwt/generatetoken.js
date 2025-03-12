import jwt from"jsonwebtoken";
export const createtokenandsavecookies=(userid,res)=>{
    const token =jwt.sign({userid},process.env.JWT_SECRET,{
         expiresIn:"1d",
    } );
  
res.cookie("jwt",token,{
    httpOnly:true,
    secure:true,
    sameSite:"strict"
  });
    return token;
};
export default createtokenandsavecookies;