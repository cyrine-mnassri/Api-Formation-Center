const mongoose=require('mongoose');
const formation_Schema=mongoose.Schema({ 

    titre:String,
    description:String,
    charge_Horaire:Number,
    programme:String,
    niveau_Difficulte:String,
    mots:[],
    session_formation:[
    {
        id_Formateur:String,
        nom_formateur:String,
        date_Debut:Date,
        date_Fin:Date,
        planning:String
    }]
});

module.exports=mongoose.model('Formation',formation_Schema);