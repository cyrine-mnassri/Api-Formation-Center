var express=require('express');

const mongoDB = require('mongodb');
var router=express.Router();
const Formation=require("../models/foramtion");
const Formateur=require("../models/formateur");
router.post('/create',(req,res,next)=>{
      const foramtion=new Formation({
        titre:req.body.titre,
        description:req.body.description,
        charge_Horaire:req.body.charge_Horaire,
        programme:req.body.programme,
        niveau_Difficulte:req.body.niveau_Difficulte,
        mots:req.body.mots
              });
              foramtion
              .save()
              .then(result=>console.log(result))
              .catch(err=>console.log(err))

res.status(200).json({msg:'Post request is working'});
});




router.get('/read',(req,res,next)=>{
    Formation.find()
    .exec()
    .then(liste_Formation=>res.status(200).json(liste_Formation))
    .catch(err=>res.status(500).json({error:err}))
    });


    
router.get('/read/:id',async (req,res,next)=>{
    var v = new Array()
    const id=req.params.id;
    const listedessessions= await Formation.findById(id);
for(var i=0;i<listedessessions.session_formation.length;i++)
   {
    var myvariable = new Object();
   const formateur=await Formateur.findOne({"_id":listedessessions.session_formation[i].id_Formateur});
    myvariable.formateur=formateur.nom,
    myvariable._id=listedessessions.session_formation[i]._id,
    myvariable.date_Debut=listedessessions.session_formation[i].date_Debut,
    myvariable.date_Fin=listedessessions.session_formation[i].date_Fin,
    myvariable.planning=listedessessions.session_formation[i].planning
   v.push(myvariable);
    
   }

   res.status(200).json(v)
 /*  Formation.findById(id)
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
    .catch(err=>res.status(500).json({error:err}))*/
    });



    router.get('/ListeDesFormationParSession/:id',(req,res,next)=>{
        const id=req.params.id;
      
       Formation.find({"session_formation._id":id})
        .exec()
        .then(
            liste_Formation=>
            {
                if(liste_Formation)
                { 
                  
                  res.status(200).json(liste_Formation);
                }
                else
                {
                    res.status(404).json({message:'not found'});
                }
            }
        )
        .catch(err=>res.status(500).json({error:err}))
        });
    
    
      


    /*Liste_Des_Session=new Array();
    for (var j in liste_Formation)
    {
        
    for(var i in liste_Formation[j].session_formation )
    {
        var x = new Object()
               x.id_formation=liste_Formation[j]._id,
               x.date_Debut=liste_Formation.session_formation[i].date_Debut ,
               x.date_Fin=liste_Formation.session_formation[i].date_Fin,
               x.planning=liste_Formation.session_formation[i].planning

        
        Liste_Des_Session.push(x);
    }*/


  
    router.get('/ListeDesFormationParFormateur/:id',async (req,res,next)=>{
        const id=req.params.id;
var ListeDesFormation = new Array();
        const formation=  await Formation.find({"session_formation.id_Formateur":id});

   for(var i=0;i<formation.length;i++)
   {

       for(var j =0 ; j<formation[i].session_formation.length;j++)
       {
           if(formation[i].session_formation[j].id_Formateur==id)
           {
        var myformation = new Object();
        myformation.id=formation[i]._id,
        myformation.titre=formation[i].titre,
        myformation.charge_Horaire=formation[i].charge_Horaire,
        myformation.niveau_Difficulte=formation[i].niveau_Difficulte,
        myformation.id_sess=formation[i].session_formation[j]._id,
        myformation.Date_debut=formation[i].session_formation[j].date_Debut,
        myformation.date_Fin=formation[i].session_formation[j].date_Fin

        ListeDesFormation.push(myformation);
           }
       }


   }


        res.status(200).json(ListeDesFormation);
/*
       Formation.find({"session_formation.id_Formateur":id})
        .exec()
        .then(
            liste_Formation=>
            {
                if(liste_Formation)
                { 
                    v=[];
                    
                    for(let i in liste_Formation)
                    {
                        for(let j in liste_Formation[i].session_formation)
                        {
                           var x =  {
                               formateur:liste_Formation[i].session_formation[j]
                           }
                           v.push(x);  
                        }
                    }
                  res.status(200).json(v);
                }
                else
                {
                    res.status(404).json({message:'not found'});
                }
            }
        )
        .catch(err=>res.status(500).json({error:err}))*/
        });
    
    
      





  
    router.get('/searchByMotCle/:id',(req,res,next)=>{
        const id=req.params.id;
        Formation.find(
            {
                mots:{$regex:id}
            }
        )
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

      
router.put('/Creation_Session_Formation/:id',(req,res,next)=>{
    const id=req.params.id;
  Formateur.findById(req.body.id_Formateur).exec().then(
      form=>{
           Formation.updateOne(
            {"_id":id},
             { "$addToSet": 
                 { 
                 "session_formation":
                 {
                     id_Formateur: req.body.id_Formateur ,
                     nom_formateur:form.nom,
                     date_Debut: new Date(req.body.date_Debut) ,
                     date_Fin: new Date(req.body.date_Fin),
                     planning: req.body.planning
                     }
                    
                 } 
             }
         ).then().catch(err=>res.status(500).json({error:err}));
     
     
      }
  );
        res.status(200).json({msg:'put request is working'});
    });


router.delete('/delete/:id',(req,res,next)=>{
    const id=req.params.id;
    Formation.remove({"_id":id})
    .exec()
    .then(
        result=>

                res.status(200).json(result)
      
          
        
    )
    .catch(err=>res.status(500).json({error:err}))
            });


         
            module.exports=router;