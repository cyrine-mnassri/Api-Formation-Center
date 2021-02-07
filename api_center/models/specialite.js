const mongoose=require('mongoose');
const specialite_Schema=mongoose.schema({
    _id:new mongoose.Types.ObjectId(),
    id_Formateur:String,
    Titre:String
});

module.exports=mongoose.model('Specialite',specialite_Schema);