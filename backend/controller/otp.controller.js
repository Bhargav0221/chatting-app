import nodemailer from"nodemailer"
const otpstore={};
export const sendotp=async(req,res)=>{
    try{
 
    const{email}=req.body;   
    const otp = Math.floor(100000 + Math.random() * 900000);    
    otpstore[email]={
        otp,
        expiry:Date.now()*5*60*1000,
    }
    const transporter=await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"singlabhargav2004@gmail.com",
            pass:"liug nudq psfa ojzx"
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
      res.status(200).json({message:"otp send successfull"});
 
}
catch(error){
  console("error occured",error);
}
}
export const verifyotp=async(req,res)=>{
    const{email,otp}=req.body;
    const data=otpstore[email];
    const{otp:storedotp,expiry}=data
    if(Date.now()>expiry)
    {
        delete otpstore[email];
        res.status(400),json({message:"otp expired"});
    }
    if(storedotp!=parseInt(otp,10)){
        res.status(300).json({message:"otp is wrong"})
    }
    delete otpstore[email];
      return { success: true, message: "OTP verified successfully." };

}