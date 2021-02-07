const mongoose=require('mongoose');
const candidat_Schema=mongoose.Schema({
    nom:String,
    prenom:String,
    email:String,
    numero_cin:String,
    photo:String,
    cv:String,
    password:String,
    ListeDesSession:[
        {
            id_Session_Formation:String,
            date_Inscription:Date,
        }
    ]
});

module.exports=mongoose.model('Candidat',candidat_Schema);