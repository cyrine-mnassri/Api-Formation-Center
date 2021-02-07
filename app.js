const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const Mongoose=require('mongoose');
const path = require('path');
const cors=require('cors');
const app=express();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});
const center=require("./api_center/routes/Api_Formateur");
const Formation=require("./api_center/routes/Api_Formation");
const Candidat=require("./api_center/routes/Api_Candidat");
const Admin=require("./api_center/routes/Api_Admin");
Mongoose.connect('mongodb://localhost:27017/Center_Formation',{
useNewUrlParser:true,
useUnifiedTopology:true
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/Formateur",center);
app.use("/Formation",Formation);
app.use("/Candidat",Candidat);
app.use("/Admin",Admin);

//Uploade File 
app.post('/api/upload', multipartMiddleware, (req, res) => {
    res.json({
    
        'message':req.files.uploads.path
  
    });
    
});

app.get('/download/:file(*)',(req, res) => {
    var file = req.params.file;
  var fileLocation = path.join('./uploads',file);
    console.log(fileLocation);
    res.download(fileLocation, file);
    });
module.exports=app;