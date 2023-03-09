const mongoose=require("mongoose");
const uri="mongodb+srv://meenu:qW2hyzzRHKsmb_G@cluster0.gjqqjvn.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);
mongoose.connect(uri,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("mongoose connected successfully")
}).catch((err)=>{
console.log(err)
});