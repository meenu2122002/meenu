require("./mongoose")
const express=require("express");
const app=express();
var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router=require("./routes/authstudent");
const router2=require("./routes/authteacher");
app.use("/api/student",router)
app.use("/api/teacher",router2);
app.listen(8080,()=>{
    console.log("application is successfully running");
});
