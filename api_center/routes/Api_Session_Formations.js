var express=require('express');
var router=express.Router();
const Session_Formation=require("../models/session_Formation");
router.post('/create',(req,res,next)=>{
      const session_Formation=new Session_Formation({
        id_Formateur:req.body.id_Formateur,
        id_Formation:req.body.id_Formation,
        date_Debut:req.body.date_Debut,
        date_Fin:req.body.date_Fin,
        planning:req.body.planning
              });
              session_Formation
              .save()
              .then(result=>console.log(result))
              .catch(err=>console.log(err))

res.status(200).json({msg:'Post request is working'});
});

router.get('/read',(req,res,next)=>{
    Session_Formation.find()
    .exec()
    .then(Candidat=>res.status(200).json(liste_Formation))
    .catch(err=>res.status(500).json({error:err}))
    });


    
router.get('/read/:id',(req,res,next)=>{
    const id=req.params.id;
    Session_Formation.findById(id)
    .exec()
    .then(
        liste_Formation=>
        {
            if(liste_Formation)
            {
                res.status(200).json(liste_Formation)
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
    Session_Formation.remove({"_id":id})
    .exec()
    .then(
        result=>

                res.status(200).json(result)
      
          
        
    )
    .catch(err=>res.status(500).json({error:err}))
            });

            module.exports=router;