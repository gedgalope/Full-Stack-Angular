//import modules and dependacies

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const route = require('./routes/route');
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist',{ useNewUrlParser: true });
//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database @ mongodb 27017');

});
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in database connection',err);
    }
});
const port = 3000;

//middleware
//cors
app.use(cors());
//body parser
app.use(bodyparser.json());

//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(path.join(__dirname,'public')));
//testing  server

//routes
app.use('/api',route);

app.get('/',(req,res) =>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log('server started at port ' + port);
});