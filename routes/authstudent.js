const mongoose = require("mongoose");
const model = require("../models/student");
const express = require("express");
const router = express.Router()
const { body, validationResult } = require('express-validator');
const multer  = require('multer')
const bcrypt = require("bcryptjs")
let email;
let branch;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profilephotos')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = req.body.rollno+".jpg"
    console.log(uniqueSuffix);
    cb(null,  uniqueSuffix);
  }
});


function filefilter(req,file,cb){
if(!file.originalname.endsWith(".jpg")){
  cb(null,false);
  
}
else{
cb(null,true)
}

}


const upload = multer({ storage: storage,
fileFilter:filefilter,
limits:{
  fileSize:2*1024
} })

router.post("/signup", body('email').isEmail(),
  body('password').isLength({ min: 8 }), body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    return true;
  }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, rollno, universityname, email, password, confirmpassword,skills } = req.body;
    let branch = req.body.branch;
    if (branch == "CE32") {
      branch = {
        CE32: {
          subjects: {

          }

        }

      }
      branch.CE32.subjects.aec = {
        teachername: "shant_but_dangerousmam",
        attendence: {
          year:2022,
          month:[]
        }
      };
      branch.CE32.subjects.maths = {
        teachername: "shant_but_dangerousmam",
        attendence: {
          year:2022,
          month:[]
        }
      };
      branch.CE32.subjects.de = {
        teachername: "manju ",
        attendence: {
          year:2022,
          month:[]
        }
      };
      branch.CE32.subjects.etc = {
        teachername: "shant_but_dangerousmam",
        attendence: {
          year:2022,
          month:[]
        }
      };
      branch.CE32.subjects.delab = {
        teachername: "shant_but_dangerousmam",
        attendence: {
          year:2022,
          month:[]
        }
      };
      branch.CE32.subjects.aeclab = {
        teachername: "shant_but_dangerousmam",
        attendence: {
          year:2022,
          month:[]
        }
      };
      branch.CE32.subjects.itws = {
        teachername: "shant_but_dangerousmam",
        attendence: {
          year:2022,
          month:[]
        }
      };
      branch.CE32.subjects.aec.attendence.month.push({
        dateoftakingclass: [],
        dateofpresent: [],
        totalclasses: 0,
        present: 0
      })
      branch.CE32.subjects.aeclab.attendence.month.push({
        dateoftakingclass: [],
        dateofpresent: [],
        totalclasses: 0,
        present: 0
      })
      branch.CE32.subjects.delab.attendence.month.push({
        dateoftakingclass: [],
        dateofpresent: [],
        totalclasses: 0,
        present: 0
      })
      branch.CE32.subjects.de.attendence.month.push({
        dateoftakingclass: [],
        dateofpresent: [],
        totalclasses: 0,
        present: 0
      })
      branch.CE32.subjects.etc.attendence.month.push({
        dateoftakingclass: [],
        dateofpresent: [],
        totalclasses: 0,
        present: 0
      })
      branch.CE32.subjects.maths.attendence.month.push({
        dateoftakingclass: [],
        dateofpresent: [],
        totalclasses: 0,
        present: 0
      })
      branch.CE32.subjects.itws.attendence.month.push({
        dateoftakingclass: [],
        dateofpresent: [],
        totalclasses: 0,
        present: 0
      })
    }

    const student = new model({
      username, rollno, universityname, email, password,
      branch,course:req.body.branch,skills

    });
    const d=await student.save();
    res.redirect("https://attendence-sage.vercel.app/signup/")
    // console.log(await student.save());
  
  });


  router.post("/login", body('email').isEmail(), body('password').isLength({ min: 8 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await model.findOne({ email: req.body.email });
    if (user) {
      const bool = await bcrypt.compare(req.body.password, user.password);
      if (bool) {
        email=user.email;
        branch=user.course;
        res.redirect("https://attendence-sage.vercel.app//subjectandmonth")
      }
      else {
        console.log("please check your credentials");
        res.redirect(res.redirect("https://attendence-sage.vercel.app//studentlogin"));
      }
  
  
    }
    else {
      console.log("please check your credentials");
      res.redirect("https://attendence-sage.vercel.app//studentlogin");
    }
  });
router.post("/subjectandmonth",async(req,res)=>{
  try{
const {subject,month}=req.body;
const user=await model.findOne({email:email});
if(branch=="CE32"){
  if(subject=="aec"){
    let Emonth=user.branch.CE32.subjects.aec.attendence.month;
   for(let i=0;i<Emonth.length;i++){
    if(Emonth[i].m==month){
      console.log("function called")
      res.send({rollno:user.rollno,email:user.email,username:user.username,dt:Emonth[i]});
    }
   };
  }
  else if (subject=="de"){
    let Emonth=user.branch.CE32.subjects.de.attendence.month;
     for(let i=0;i<Emonth.length;i++){
      if(Emonth[i].m==month){
        console.log("function called")
        res.send({rollno:user.rollno,email:user.email,username:user.username,dt:Emonth[i]});
      }
     };
  }
  else if (subject=="delab"){
  let Emonth=user.branch.CE32.subjects.delab.attendence.month;
     for(let i=0;i<Emonth.length;i++){
      if(Emonth[i].m==month){
        console.log("function called")
        res.send({rollno:user.rollno,email:user.email,username:user.username,dt:Emonth[i]});
      }
     };
  }
  else if (subject=="aeclab"){
  let Emonth=user.branch.CE32.subjects.aeclab.attendence.month;
     for(let i=0;i<Emonth.length;i++){
      if(Emonth[i].m==month){
        console.log("function called")
        res.send({rollno:user.rollno,email:user.email,username:user.username,dt:Emonth[i]});
      }
     };
  }
  else if (subject=="etc"){
    let Emonth=user.branch.CE32.subjects.etc.attendence.month;
    for(let i=0;i<Emonth.length;i++){
     if(Emonth[i].m==month){
       console.log("function called")
       res.send({rollno:user.rollno,email:user.email,username:user.username,dt:Emonth[i]});
     }
    };
  }
  else if (subject=="maths"){
    let Emonth=user.branch.CE32.subjects.maths.attendence.month;
    for(let i=0;i<Emonth.length;i++){
     if(Emonth[i].m==month){
       console.log("function called")
       res.send({rollno:user.rollno,email:user.email,username:user.username,dt:Emonth[i]});
     }
    };
  }
  else if (subject=="itws"){
    let Emonth=user.branch.CE32.subjects.itws.attendence.month;
    for(let i=0;i<Emonth.length;i++){
     if(Emonth[i].m==month){
       console.log("function called")
       res.send({rollno:user.rollno,email:user.email,username:user.username,dt:Emonth[i]});
     }
    };
  }
}



  }catch(e){
    console.log("no user exist")
    res.json({errors:e})
  }
})  


module.exports = router;
