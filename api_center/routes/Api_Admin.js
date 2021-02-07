var express=require('express');
var router=express.Router();
var jwt = require('jsonwebtoken');
router.post('/authentification', (req,res,next)=>{
    const  email  = req.body.email;
 if(email=="user-admin" && req.body.password=="admin-2019" )
 {
    let token=jwt.sign({username:email},'secret',{expiresIn : '3h'});
    res.status(200).json({token:token});
 }
 else
 {
     res.status(404).json({token:''})
 }

   
// res.status(200).json({message:req.body.id})
}); 

router.get('/username/:id', function(req,res,next){
    let token = req.params.id;
    jwt.verify(token,'secret', function(err, tokendata){
        if(err){
          return res.status(400).json({message:' Unauthorized request'});
        }
        if(tokendata){
      
          return res.status(200).json(tokendata.username);
        }
      })
    
  });
            module.exports=router;