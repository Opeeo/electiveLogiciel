const express = require("express");
const multer = require("multer");

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

app.post('/api/uploadFile', upload.single('image'), (req,res) => {
    console.log(req.file);
    res.status(200).json(`File uploaded : ${req.file.path}`);
});

app.get('/api/getFile/:id', async (req, res) => {
    res.send()
})

app.listen(3000);