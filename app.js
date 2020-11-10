const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/dance-website', {useNewUrlParser: true});
const port = 8000

// Define mongoose schema------------
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    textarea: String,
  });

const contact = mongoose.model('contact', contactSchema);

// PUG ENGINE SPECIFIC STUFF
app.set('view engine', 'pug')// set the template engine-------
app.set('views', path.join(__dirname, 'template'));//set the views directory-------

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// for serving static file-----------
app.use(express.urlencoded());

//END POINTS
app.get('/', (req, res) => {   
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {   
    const params = {}
    res.status(200).render('contact.pug', params)
})
app.post('/contact', (req, res) => {   
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    // res.status(200).render('contact.pug', params)
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})