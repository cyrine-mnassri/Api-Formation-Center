const mongoose=require('mongoose');
const session_Formation_Schema=mongoose.schema({
    id_Formateur:String,
    id_Formation:String,
    date_Debut:Date,
    date_Fin:Date,
    planning:String
});

module.exports=mongoose.model('Session_Formation',session_Formation_Schema);