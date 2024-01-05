const express=require("express");
const path=require("path");
const app=express();
var mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/contactDance');
const port=80;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    
});
var Contact = mongoose.model('Contact',contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("this item has not been saved")
    });
    // res.status(200).render('contact.pug',params);
})

app.listen(port,()=>{
    console.log(`this is application is running on ${port}`)
})