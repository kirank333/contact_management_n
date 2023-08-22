const mongoose=require("mongoose");

const connectDb= async () => {
    try{
        const username = encodeURIComponent("kirank");

const password = encodeURIComponent("cyborgkir@n3");
// `mongodb+srv://${username}:${password}@kirancluster.5lbitwx.mongodb.net/?retryWrites=true&w=majority`


        const connect=await mongoose.connect(`mongodb+srv://${username}:${password}@kirancluster.5lbitwx.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("Database connected");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports=connectDb;