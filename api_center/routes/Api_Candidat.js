var express=require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router=express.Router();
const Candidat=require("../models/candidat");
const Formation=require("../models/foramtion");
router.post('/create', async (req,res,next)=>{
    const motDePasseCrypte= await bcrypt.hash(req.body.password,10);
      const candidat=new Candidat({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        numero_cin:req.body.numero_cin,
        photo:req.body.photo,
        cv:req.body.cv,
        //cryptage de mot de passe par le modul bcrypt
        password:motDePasseCrypte,
        ListeDesSession:[]

              });
              candidat
              .save()
              .then(result=>console.log(result))
              .catch(err=>console.log(err))

res.status(200).json({msg:'Post request is working'});
});

router.get('/read',(req,res,next)=>{
    Candidat.find()
    .exec()
    .then(liste_candidats=>res.status(200).json(liste_candidats))
    .catch(err=>res.status(500).json({error:err}))
    });


    
router.get('/read/:id',(req,res,next)=>{
    const id=req.params.id;
    Candidat.findById(id)
    .exec()
    .then(
        liste_candidats=>
        {
            if(liste_candidats)
            {
                res.status(200).json(liste_candidats)
            }
            else
            {
                res.status(404).json({message:'not found'})
            }
          
        }
    )
    .catch(err=>res.status(500).json({error:err}))
    });



    router.get('/ListeDesSessionParCandidat/:id',async(req,res,next)=>{
        var v=new Array();
        const id=req.params.id;
        const candidat = await Candidat.findById(id);
      for(var i=0;i<candidat.ListeDesSession.length;i++)
      {
        var myvariable = new Object();
        myvariable.session=candidat.ListeDesSession[i];
    //    myvariable.formation=await Formation.find({"session_formation._id":candidat.ListeDesSession[i].id_Session_Formation});
      
        myvariable.formation=await Formation.findOne({"session_formation._id":candidat.ListeDesSession[i].id_Session_Formation});
        for(var j=0;j< myvariable.formation.session_formation.length;j++)
        {
            if( myvariable.formation.session_formation[j]._id==candidat.ListeDesSession[i].id_Session_Formation)
            {
                myvariable.sessionformation= myvariable.formation.session_formation[j];
            }
        }
      
        v.push(myvariable);
      }
        res.status(200).json(v);
        });
    
        router.get('/Count/:id',async (req,res,next)=>{
            const id=req.params.id;

           const nb= await Candidat.find({"ListeDesSession.id_Session_Formation":id}).count();
           res.status(200).json(nb);
          
            });

        router.get('/Verifiaction/:id/:id2',(req,res,next)=>{
            const id=req.params.id;
            const id2=req.params.id2;
            Candidat.find({"_id":id,"ListeDesSession.id_Session_Formation":id2})
            .exec()
            .then(
                liste_candidats=>
                {
                    if(liste_candidats.length>0)
                    {
                        res.status(200).json(true);
                    }
                    else
                    {
                        res.status(200).json(false);
                    }
                      
                    }
                   
            )
            .catch(err=>res.status(500).json({error:err}))
            });
        
        
    

router.put('/Inscription_Candidat_In_Session_Formation/:id',(req,res,next)=>{
    const id=req.params.id;
       Candidat.updateOne(
        {"_id":id},
        { "$addToSet": 
            { 
                "ListeDesSession":
                {
                    id_Session_Formation: req.body.id_Session_Formation ,
                    date_Inscription: new Date(req.body.date_Inscription)
                
                }
            }
        }
       ).then().catch(err=>res.status(500).json({error:err}));

    res.status(200).json({msg:'put request is working'});

});


router.delete('/delete/:id',(req,res,next)=>{
    const id=req.params.id;
    Candidat.remove({"_id":id})
    .exec()
    .then(
        result=>

                res.status(200).json(result)
      
          
        
    )
    .catch(err=>res.status(500).json({error:err}))
            });





            router.post('/authentification', async (req,res,next)=>{
                const  email  = req.body.email;

                Candidat.findOne({email:email}).exec().then(candidat=>{
              console.log(candidat);
                       if(candidat)
                       {
                           if( bcrypt.compare(candidat.password, req.body.password))
                           {
                               let token=jwt.sign({username:candidat._id},'secret',{expiresIn : '3h'});
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