const mongoose=require('mongoose');
const formateur_Schema=mongoose.Schema({
    
    nom:String,
    prenom:String,
    email:String,
    numero_Tel:Number,
    numero_cin:String,
    tarif_Par_H:Number,
    photo:String,
    cv:String,
    password:String,
    specialite:[]
});

module.exports=mongoose.model('Formateur',formateur_Schema);