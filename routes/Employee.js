var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET users listing. */
router.get('/employee', function(req, res, next) {
  res.render('EmployeeInterface',{msg:''});
});

router.get('/fetchallcity',function(req,res){
    pool.query("select * from cities where stateid=?",[req.query.stateid],function(error,result){
      if(error)
      {
        console.log(error)
        res.status(500).json([])
      }
      else{
        res.status(200).json(result)
      }
    })
  })

  

router.get('/fetchallstates',function(req,res){
    pool.query("select * from state",function(error,result){
      if(error)
      {
        console.log(error)
       res.status(500).json([])
      }
      else{
       res.status(200).json(result)
      }
    })
  })

  router.post('/submitemployee',upload.single("image"),function(req,res,next){
    pool.query("insert into codepanda (firstname,lastname,birthdate,email,mobile,address,state,city,zipcode,qualification,department,gender,image) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.fname,req.body.lname,req.body.dob,req.body.em,req.body.mn,req.body.address,req.body.state,req.body.city,req.body.zipcode,req.body.qual,req.body.depart,req.body.gender,req.file.originalname],function(error,result){
      if(error)
      {
       console.log(error)
       res.render('EmployeeInterface',{msg:"Server Error"})
      }
      else{
      res.render('EmployeeInterface',{msg:'Record Submitted'})
      }
    })
  })

  router.put('/employeeupdate/:employeeid',function(req,res){
    console.log(req.body)
    console.log(req.params)
    pool.query("update codepanda SET firstname=?,lastname=? where employeeid=?",[req.body.firstname,req.body.lastname,req.params.employeeid],function(error,result){
      
     if(error)
     {
     res.status(500).json()
     }
     else{
       res.status(200).json(result)
     }
    })
  })
  
  router.patch('/patchupdatemployee/:employeeid',function(req,res){
    pool.query("update codepanda SET email=? where employeeid=?",
    [req.body.email,req.params.employeeid],function(error,result){
      if(error)
      {
        res.status(500).json()
      }
      else{
        res.status(200).json(result)
      }
    })
  })
  
  router.delete('/datelemployee/:employeeid',function(req,res){
    pool.query("delete from codepanda where employeeid=?",[req.body.employeeid,req.params.employeeid],function(error,result){
      if(error)
      {
        res.status(500).json()
      }
      else{
        res.status(200).json(result)
      }
    })
  })
module.exports = router;