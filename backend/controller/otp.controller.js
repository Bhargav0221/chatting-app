import nodemailer from"nodemailer"
const otpstore={};
export const sendotp=async(req,res)=>{
    try{
        const{email}=req.body;   
  if(otpstore[email])
  {
    delete otpstore[email];
  }
   
    const otp = Math.floor(100000 + Math.random() * 900000);    
    otpstore[email]={
        otp,
        expiry:Date.now()+5*60*1000,
    }
    const transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "singlabhargav2004@gmail.com",
            pass: "usat eiwy dhhn obsl"
        },
    })
        const mailoptions={
            from:"singlabhargav2004@gmail.com",
            to:email,
            subject:"YOUR OTP IS",
            text:`your otp is${otp}`
        }
        const sended=await transporter.sendMail(mailoptions)
      console.log ("otp is send");
     return  res.status(200).json({message:"otp send successfull"});
 
}
catch(error){
  console.log("error occured",error);
  return res.status(500).json(error); // ✅ Ensuring response

}
}
export const verifyotp=async(req,res)=>{
    const{email,otp}=req.body;
    const data=otpstore[email];
    if (!data) {
        return res.status(400).json({ message: "OTP not found or expired" });
    }
    
    
    const{otp:storedotp,expiry}=data
    if(Date.now()>expiry)
    {
        delete otpstore[email];
        return res.status(400).json({message:"otp expired"});
    }
    if(storedotp!==parseInt(otp,10)){
       return  res.status(400).json({message:"otp is wrong"})
    }
    delete otpstore[email];
    return  res.status(200).json({ success: true, message: "OTP verified successfully" });

}