const mongoose=require('mongoose');
const session_Candidat_Schema=mongoose.schema({
    id_Candidat:String,
    id_Session_Formation:String,
    date_Inscription:Date,
});

module.exports=mongoose.model('Session_Candidat',session_Candidat_Schema);