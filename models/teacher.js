const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const schema=new mongoose.Schema({
    username:{
type:String,
required:true,

    },
    password:{
        type:String,
        required:true,
        min:8
    },
    email:{
type:String,
required:true,
unique:true
    },
    mainsub:{
type:String,
required:true
    },
    qualifications:{
        type:String,
        required:true
    }
});
schema.pre("save",async function(next){
    var salt = bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
const teacher=mongoose.model("teacher",schema);
module.exports=teacher;