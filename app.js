const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
var bodyparser= require( 'body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

//Define mongoose schema

var contactSchema = new mongoose.Schema({
   name: String,
   age: String,
   email: String,
   address: String,
   phone: String
 });

 var Contact = mongoose.model('Contact', contactSchema);//mongoose model


// Express specific stuff
app.use('/static',express.static('static'));//for serving static files
app.use(express.urlencoded());
//Pug specific stuff
app.set('view engine', 'pug')//Serving the template engine as pug
app.set('views' ,path.join(__dirname,'views'));//set the views directory


//Endpoints
app.get("/",(req, res)=>{
   
   const params = {};
   res.status(200).render('home.pug',params);
});
app.get("/contact",(req, res)=>{
   
   const params = {};
   res.status(200).render('contact.pug',params);
});

app.post("/contact",(req, res)=>{
   
   var myData= new Contact(req.body);
   myData.save().then(()=>{
      res.send("This item has been saved into the database")
   }).catch(()=>{
      res.status(200).send("Item is not saved in the database")
   })
   
  // res.status(200).render('contact.pug',params);
});


// start the server
app.listen(port ,()=>{
    console.log(`The application started successfully on port ${port}`);
})