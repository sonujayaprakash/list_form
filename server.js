var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.set('view engine','ejs');
app.set('views','./views');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/student');
var student = require('./model/student.js');

app.get('/', function(req,res){
    res.render('form');
});
app.post('/', function(req,res){
    var info = req.body;
    var stu = new student({
        name:info.name,
        email:info.email,
        age:info.age
    });
    stu.save(function(err,response){
        if (err){
            res.send('error');
        }
        else {
            res.redirect('/list/?msg=Success');
        }
    });
});

app.get('/list', function(req,res){
    var msg = req.query.msg
    student.find(function(err,response){
        if (err){
            res.send('error');
        }
        else{
            res.render('list',{'data':response , 'mess':msg});
        }
    });
});

app.listen(3040)