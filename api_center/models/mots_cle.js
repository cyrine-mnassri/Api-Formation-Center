const mongoose=require('mongoose');
const mots_Schema=mongoose.schema({
    _id:new mongoose.Types.ObjectId(),
    id_Formation:String,
    Titre:String
});

module.exports=mongoose.model('Mots_Cle',mots_Schema);