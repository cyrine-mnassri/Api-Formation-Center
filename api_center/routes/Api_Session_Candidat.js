var express=require('express');
var router=express.Router();
const Session_Candidat=require("../models/session_Candidat");
router.post('/create',(req,res,next)=>{
      const session_Candidat=new Session_Candidat({
        id_Candidat:req.body.id_Candidat,
        id_Session_Formation:req.body.id_Session_Formation,
        date_Inscription:req.body.date_Inscription
              });
              session_Candidat
              .save()
              .then(result=>console.log(result))
              .catch(err=>console.log(err))

res.status(200).json({msg:'Post request is working'});
});

router.get('/read',(req,res,next)=>{
    Session_Candidat.find()
    .exec()
    .then(Candidat=>res.status(200).json(liste_Formation))
    .catch(err=>res.status(500).json({error:err}))
    });


    
router.get('/read/:id',(req,res,next)=>{
    const id=req.params.id;
    Session_Candidat.findById(id)
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
    Session_Candidat.remove({"_id":id})
    .exec()
    .then(
        result=>

                res.status(200).json(result)
      
          
        
    )
    .catch(err=>res.status(500).json({error:err}))
            });

            module.exports=router;