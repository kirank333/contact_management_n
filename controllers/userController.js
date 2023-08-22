const asyncHandler=require("express-async-handler");
const User=require("../models/userModels");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//public
const registerUser=asyncHandler (async(req,res) => {
    const {username,email,password}=req.body;
    if(!username || !email  || !password){
        res.status(400);
        throw new Error("all field r mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered");
        }
    const hashedPassword =await bcrypt.hash(password,10);
    console.log("hasedpass",hashedPassword);
    const user= await User.create({
    username,
    email,
    password:hashedPassword,
});
console.log(`user created ${user}`);
if(user){
    res.status(201).json({ _id:user.id,email:user.email});
}
else{
    res.status(400);
    throw new Error("user data us not valid");
}

    res.json({"message":"Register user"});

});
//public
const loginUser=asyncHandler (async(req,res) => {
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are maandatory");
    }
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign(
            {
                user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },

        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"50m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("email or pssword not valid ");
    }
   
});
//private

const currentUser=asyncHandler (async(req,res) => {
    
    res.json(req.user);
});
module.exports={registerUser,loginUser,currentUser};




















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































   
     