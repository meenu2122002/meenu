const express = require("express")
const router2 = express.Router();
const teacher = require("../models/teacher");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const student = require("../models/student");


router2.post("/signup", body('email').isEmail(),

  body('password').isLength({ min: 8 }), body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, mainsub, qualifications } = req.body;
    const newteacher = new teacher({ username, email, password, qualifications, mainsub });

    console.log(await newteacher.save());
    res.redirect("https://attendence-sage.vercel.app/")


  });


router2.post("/teacherlogin", body('email').isEmail(), body('password').isLength({ min: 8 }), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await teacher.findOne({ email: req.body.email });
  if (user) {
    const bool = await bcrypt.compare(req.body.password, user.password);
    if (bool) {
      res.redirect("https://attendence-sage.vercel.app/chooseclassandsubject")
    }
    else {
      console.log("please check your credentials");
      res.redirect(res.redirect("https://attendence-sage.vercel.app/teacherlogin"));
    }


  }
  else {
    console.log("please check your credentials");
    res.redirect("https://attendence-sage.vercel.app/teacherlogin");
  }
});

router2.post("/getstudents", async (req, res) => {

  const students = await student.find({ course: req.body.students.branch }).select({ username: 1, email: 1, course: 1, skills: 1, rollno: 1 }).sort({ rollno: 1 });
  // console.log(students)

  res.send(students);


});
router2.post("/takeattendence", async (req, res) => {
  try {

    const { students, attendence } = req.body;
    const sub = students.subject;
    if (students.branch == "CE32") {
      if (sub == "aec") {
        for (let i = 0; i < attendence.length; i++) {
          let c = await student.findById(attendence[i].id);
          console.log(c + "c")
          let arr = c.branch.CE32.subjects.aec.attendence.month;
          let ind = -1;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].m == new Date().getMonth()) {
              ind = k;
              break;
            };
          };
          let obj;
          let newarr;
          if (ind == -1) {
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass: [new Date().getDate()],
              dateofpresent: [attendence[i].status ? new Date().getDate() : -1],
              totalclasses: 1,
              present: attendence[i].status
            }
          }
          else {
            newarr = arr.filter((e) => {
              return !(e.m == new Date().getMonth())
            })
            arr[ind].dateoftakingclass.push(new Date().getDate());
            arr[ind].dateofpresent.push(attendence[i].status ? new Date().getDate() : -1)
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass:  arr[ind].dateoftakingclass,
              dateofpresent:arr[ind].dateofpresent
                ,
              totalclasses: (arr[ind].totalclasses + 1),
              present: arr[ind].present + attendence[i].status
            }
            arr = newarr;
          }

          let a = await student.findByIdAndUpdate(attendence[i].id, { branch: { CE32: { subjects: { aec: { attendence: { year: new Date().getFullYear(), month: arr.concat(obj) } },de:c.branch.CE32.subjects.de,aeclab:c.branch.CE32.subjects.aeclab,etc:c.branch.CE32.subjects.etc,maths:c.branch.CE32.subjects.maths,delab:c.branch.CE32.subjects.delab,itws:c.branch.CE32.subjects.itws } } } });



        }

      }
      else if (sub == "maths") {
        for (let i = 0; i < attendence.length; i++) {
          let c = await student.findById(attendence[i].id);
          console.log(c + "c")
          let arr = c.branch.CE32.subjects.maths.attendence.month;
          let ind = -1;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].m == new Date().getMonth()) {
              ind = k;
              break;
            };
          };
          let obj;
          let newarr;
          if (ind == -1) {
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass: [new Date().getDate()],
              dateofpresent: [attendence[i].status ? new Date().getDate() : -1],
              totalclasses: 1,
              present: attendence[i].status
            }
          }
          else {
            newarr = arr.filter((e) => {
              return !(e.m == new Date().getMonth())
            })
            arr[ind].dateoftakingclass.push(new Date().getDate());
            arr[ind].dateofpresent.push(attendence[i].status ? new Date().getDate() : -1)
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass:  arr[ind].dateoftakingclass,
              dateofpresent:arr[ind].dateofpresent
                ,
              totalclasses: (arr[ind].totalclasses + 1),
              present: arr[ind].present + attendence[i].status
            }
            arr = newarr;
          }

          let a = await student.findByIdAndUpdate(attendence[i].id, { branch: { CE32: { subjects: { maths: { attendence: { year: new Date().getFullYear(), month: arr.concat(obj) } },de:c.branch.CE32.subjects.de,aeclab:c.branch.CE32.subjects.aeclab,etc:c.branch.CE32.subjects.etc,aec:c.branch.CE32.subjects.aec,delab:c.branch.CE32.subjects.delab,itws:c.branch.CE32.subjects.itws  } } } });



        }
      }
      else if (sub == "delab") {
        for (let i = 0; i < attendence.length; i++) {
          let c = await student.findById(attendence[i].id);
          console.log(c + "c")
          let arr = c.branch.CE32.subjects.delab.attendence.month;
          let ind = -1;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].m == new Date().getMonth()) {
              ind = k;
              break;
            };
          };
          let obj;
          let newarr;
          if (ind == -1) {
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass: [new Date().getDate()],
              dateofpresent: [attendence[i].status ? new Date().getDate() : -1],
              totalclasses: 1,
              present: attendence[i].status
            }
          }
          else {
            newarr = arr.filter((e) => {
              return !(e.m == new Date().getMonth())
            })
            arr[ind].dateoftakingclass.push(new Date().getDate());
            arr[ind].dateofpresent.push(attendence[i].status ? new Date().getDate() : -1)
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass:  arr[ind].dateoftakingclass,
              dateofpresent:arr[ind].dateofpresent
                ,
              totalclasses: (arr[ind].totalclasses + 1),
              present: arr[ind].present + attendence[i].status
            }
            arr = newarr;
          }

          let a = await student.findByIdAndUpdate(attendence[i].id, { branch: { CE32: { subjects: { delab: { attendence: { year: new Date().getFullYear(), month: arr.concat(obj) } },de:c.branch.CE32.subjects.de,aeclab:c.branch.CE32.subjects.aeclab,etc:c.branch.CE32.subjects.etc,maths:c.branch.CE32.subjects.maths,aec:c.branch.CE32.subjects.aec,itws:c.branch.CE32.subjects.itws  } } } });



        }
      }
      else if (sub == "de") {
        for (let i = 0; i < attendence.length; i++) {
          let c = await student.findById(attendence[i].id);
          console.log(c + "c")
          let arr = c.branch.CE32.subjects.de.attendence.month;
          let ind = -1;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].m == new Date().getMonth()) {
              ind = k;
              break;
            };
          };
          let obj;
          let newarr;
          if (ind == -1) {
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass: [new Date().getDate()],
              dateofpresent: [attendence[i].status ? new Date().getDate() : -1],
              totalclasses: 1,
              present: attendence[i].status
            }
          }
          else {
            newarr = arr.filter((e) => {
              return !(e.m == new Date().getMonth())
            })
            arr[ind].dateoftakingclass.push(new Date().getDate());
            arr[ind].dateofpresent.push(attendence[i].status ? new Date().getDate() : -1)
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass:  arr[ind].dateoftakingclass,
              dateofpresent:arr[ind].dateofpresent
                ,
              totalclasses: (arr[ind].totalclasses + 1),
              present: arr[ind].present + attendence[i].status
            }
            arr = newarr;
          }

          let a = await student.findByIdAndUpdate(attendence[i].id, { branch: { CE32: { subjects: { de: { attendence: { year: new Date().getFullYear(), month: arr.concat(obj) } },aec:c.branch.CE32.subjects.aec,aeclab:c.branch.CE32.subjects.aeclab,etc:c.branch.CE32.subjects.etc,maths:c.branch.CE32.subjects.maths,delab:c.branch.CE32.subjects.delab,itws:c.branch.CE32.subjects.itws  } } } });



        }
      }
      else if (sub == "aeclab") {
        for (let i = 0; i < attendence.length; i++) {
          let c = await student.findById(attendence[i].id);
          console.log(c + "c")
          let arr = c.branch.CE32.subjects.aeclab.attendence.month;
          let ind = -1;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].m == new Date().getMonth()) {
              ind = k;
              break;
            };
          };
          let obj;
          let newarr;
          if (ind == -1) {
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass: [new Date().getDate()],
              dateofpresent: [attendence[i].status ? new Date().getDate() : -1],
              totalclasses: 1,
              present: attendence[i].status
            }
          }
          else {
            newarr = arr.filter((e) => {
              return !(e.m == new Date().getMonth())
            })
            arr[ind].dateoftakingclass.push(new Date().getDate());
            arr[ind].dateofpresent.push(attendence[i].status ? new Date().getDate() : -1)
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass:  arr[ind].dateoftakingclass,
              dateofpresent:arr[ind].dateofpresent
                ,
              totalclasses: (arr[ind].totalclasses + 1),
              present: arr[ind].present + attendence[i].status
            }
            arr = newarr;
          }

          let a = await student.findByIdAndUpdate(attendence[i].id, { branch: { CE32: { subjects: { aeclab: { attendence: { year: new Date().getFullYear(), month: arr.concat(obj) } },de:c.branch.CE32.subjects.de,aec:c.branch.CE32.subjects.aec,etc:c.branch.CE32.subjects.etc,maths:c.branch.CE32.subjects.maths,delab:c.branch.CE32.subjects.delab,itws:c.branch.CE32.subjects.itws  } } } });



        }
      }
      else if (sub == "itws") {
        for (let i = 0; i < attendence.length; i++) {
          let c = await student.findById(attendence[i].id);
          console.log(c + "c")
          let arr = c.branch.CE32.subjects.itws.attendence.month;
          let ind = -1;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].m == new Date().getMonth()) {
              ind = k;
              break;
            };
          };
          let obj;
          let newarr;
          if (ind == -1) {
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass: [new Date().getDate()],
              dateofpresent: [attendence[i].status ? new Date().getDate() : -1],
              totalclasses: 1,
              present: attendence[i].status
            }
          }
          else {
            newarr = arr.filter((e) => {
              return !(e.m == new Date().getMonth())
            })
            arr[ind].dateoftakingclass.push(new Date().getDate());
            arr[ind].dateofpresent.push(attendence[i].status ? new Date().getDate() : -1)
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass:  arr[ind].dateoftakingclass,
              dateofpresent:arr[ind].dateofpresent
                ,
              totalclasses: (arr[ind].totalclasses + 1),
              present: arr[ind].present + attendence[i].status
            }
            arr = newarr;
          }

          let a = await student.findByIdAndUpdate(attendence[i].id, { branch: { CE32: { subjects: { itws: { attendence: { year: new Date().getFullYear(), month: arr.concat(obj) } },de:c.branch.CE32.subjects.de,aeclab:c.branch.CE32.subjects.aeclab,etc:c.branch.CE32.subjects.etc,maths:c.branch.CE32.subjects.maths,delab:c.branch.CE32.subjects.delab,aec:c.branch.CE32.subjects.aec  } } } });



        }
      }
      else if (sub == "etc") {
        for (let i = 0; i < attendence.length; i++) {
          let c = await student.findById(attendence[i].id);
          console.log(c + "c")
          let arr = c.branch.CE32.subjects.etc.attendence.month;
          let ind = -1;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].m == new Date().getMonth()) {
              ind = k;
              break;
            };
          };
          let obj;
          let newarr;
          if (ind == -1) {
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass: [new Date().getDate()],
              dateofpresent: [attendence[i].status ? new Date().getDate() : -1],
              totalclasses: 1,
              present: attendence[i].status
            }
          }
          else {
            newarr = arr.filter((e) => {
              return !(e.m == new Date().getMonth())
            })
            arr[ind].dateoftakingclass.push(new Date().getDate());
            arr[ind].dateofpresent.push(attendence[i].status ? new Date().getDate() : -1)
            obj = {
              m: new Date().getMonth(),
              dateoftakingclass:  arr[ind].dateoftakingclass,
              dateofpresent:arr[ind].dateofpresent
                ,
              totalclasses: (arr[ind].totalclasses + 1),
              present: arr[ind].present + attendence[i].status
            }
            arr = newarr;
          }

          let a = await student.findByIdAndUpdate(attendence[i].id, { branch: { CE32: { subjects: { etc: { attendence: { year: new Date().getFullYear(), month: arr.concat(obj) } } ,de:c.branch.CE32.subjects.de,aeclab:c.branch.CE32.subjects.aeclab,aec:c.branch.CE32.subjects.aec,maths:c.branch.CE32.subjects.maths,delab:c.branch.CE32.subjects.delab,itws:c.branch.CE32.subjects.itws } } } });



        }
      }
    }
    else {

    }


    // res.redirect("https://attendence-sage.vercel.app//");
    res.send("hello there")
  } catch (e) {
    console.log(e + "   error")
  }
})





module.exports = router2;