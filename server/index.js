const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cros = require('cors');
const multer = require('multer');
const path = require('path')
var fs = require('fs');

const app = express();

app.listen('3001', () => {
    console.log("Local server runing on 3001");
})

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: '',
    database: "express_js_db"
})

app.use(cros());
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("./public/image"))
app.use("/public", express.static(path.join(__dirname, 'public')));


//! Use of Multer
var storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './public/image/');
    },
    filename: function(request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

var upload = multer({
    storage: storage
});


app.post('/addpost', upload.single('file'), (req, res) => {


    const title = req.body.title;
    const desc = req.body.desc;
    const date = req.body.curdate;
    const image = "http://localhost:3001/public/image/" + req.body.fileName
    const sqlInsert = "Insert into blog_post (title,description,image,date) VALUES(?,?,?,?)";
    db.query(sqlInsert, [title, desc, image, date], (err, result) => {
        console.log(result.insertId)
        res.send(result)
    })


})
app.get('/allpost', (req, res) => {

    sqlSelect = "SELECT * FROM `blog_post` order by id desc";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);

    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const sqlDelete = "DELETE FROM `blog_post` WHERE id = ?";
    db.query(sqlDelete, [id], (err, result) => {
        console.log(err);
    })

})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    const sqlSelect = "select * from blog_post where id = ?";
    db.query(sqlSelect, [id], (err, result) => {
        res.send(result);
    })
})

app.post('/update/', upload.single('file'), (req, res) => {

    console.log('update data')
    console.log(req.body)
    const id = req.body.id
    const title = req.body.title;
    const desc = req.body.desc;
    const date = req.body.curdate;
    const imagename = req.body.fileName;
    if (req.body.fileName == 'null') {
        const sqlUpdate = "UPDATE `blog_post` SET `title`=?,`description`=?,`date`=? WHERE id = ?";
        db.query(sqlUpdate, [title, desc, date, id], (err, result) => {
            console.log(result);
            res.send(result.message);
        });
    } else {
        const image = "http://localhost:3001/public/image/" + req.body.fileName
        const sqlUpdate = "UPDATE `blog_post` SET `title`=?,`description`=?,`image`=?,`date`=? WHERE id = ?";
        db.query(sqlUpdate, [title, desc, image, date, id], (err, result) => {
            console.log(result.message);
            res.send(result.message);
        });
    }



    // db.query(sqlUpdate, [title, desc, date, id], (err, result) => {
    //     console.log(result);
    // });


})