const asyncHandler =require("express-async-handler");
const Contact=require("../models/contactModel");
const contactModel = require("../models/contactModel");
const getContacts=asyncHandler (async(req,res) => {
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});
const getContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    

    res.status(200).json(contact);
});

const createContact=asyncHandler (async(req,res)=>{
    console.log(req.body);
    const{name,email,phone}=req.body;
    if(!name|| !email || !phone){
        res.status(400);
        throw new Error("All fields r mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});
const updateContact=asyncHandler (async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(404);
        throw new Error("User dont have permissio to update other user contacts");
    }
    // const updatedContact = await Contact.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(contact);

    console.log(updatedContact);
    res.status(200).json(updatedContact);
});




const deleteContact=asyncHandler (async (req,res)=>{
   
   const contact= await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports={getContacts,getContact,createContact,updateContact,deleteContact};