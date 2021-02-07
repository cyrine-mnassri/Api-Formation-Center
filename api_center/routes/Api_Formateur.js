var express=require('express');

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var router=express.Router();
const Formateur=require("../models/formateur");
router.post('/create',async(req,res,next)=>{
    const motDePasseCrypte= await bcrypt.hash(req.body.password,10);
      const formateur=new Formateur({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        numero_Tel:req.body.numero_Tel,
        numero_cin:req.body.numero_cin,
        tarif_Par_H:req.body.tarif_Par_H,
        photo:req.body.photo,
        cv:req.body.cv,
        password:motDePasseCrypte,
        specialite:req.body.specialite
              });
              formateur
              .save()
              .then(result=>console.log(result))
              .catch(err=>console.log(err))

res.status(200).json({msg:'Post request is working'});
});

router.get('/read',(req,res,next)=>{
    Formateur.find()
    .exec()
    .then(liste_formateurs=>res.status(200).json(liste_formateurs))
    .catch(err=>res.status(500).json({error:err}))
    });


    
router.get('/read/:id',(req,res,next)=>{
    const id=req.params.id;
    Formateur.findById(id)
    .exec()
    .then(
        liste_formateurs=>
        {
            if(liste_formateurs)
            {
                res.status(200).json(liste_formateurs)
            }
            else
            {
                res.status(404).json({message:'not found'})
            }
          
        }
    )
    .catch(err=>res.status(500).json({error:err}))
    });

router.put('/update',(req,res,next)=>{
        res.status(200).json({msg:'put request is working'});
        });
router.delete('/delete/:id',(req,res,next)=>{
    const id=req.params.id;
    Formateur.remove({"_id":id})
    .exec()
    .then(
        result=>

                res.status(200).json(result)
      
          
        
    )
    .catch(err=>res.status(500).json({error:err}))
            });


               
            router.post('/authentification', async (req,res,next)=>{
                const  email  = req.body.email;

                Formateur.findOne({email:email}).exec().then(formateur=>{
                       if(formateur)
                       {
                           if( bcrypt.compare(formateur.password, req.body.password))
                           {
                               let token=jwt.sign({username:formateur._id},'secret',{expiresIn : '3h'});
                               res.status(200).json({token:token});
                           }
                       }

                       else
                {
                    res.status(404).json({token:''})
                }

               })
               .catch(err=>res.status(500).json({error:err}))

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