const express = require("express");
const multer = require("multer");
const file = require("./model/model");
const asyncHandler = require ("express-async-handler");
const connectDB = require("./config/db");


connectDB(); 

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    }, 
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

const upload = multer({ storage : fileStorageEngine });

app.get('/test', (req, res, next) => {
    res.send('test');
});

app.post('/api/uploadFile', upload.single('image'), asyncHandler(async (req,res) => {

    try{
        const newFile = await file.create({
            name: req.file.filename
        });
        console.log(req.file);
        res.status(200).json(`File uploaded ${newFile}`);
    }catch(error){
        res.json(error);
    }
    
}));

app.get('/api/getFile/:id', asyncHandler(async (req, res) => {
    const getfile = await file.findOne({_id : req.params.id});

    await res.sendFile((`./images/${getfile.name}`), {root: './'});
}));

app.listen(8000);