const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const usersRoute = require('./routes/api/users');

const app = express();


//use to parse json data to http req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1/users',usersRoute);

app.get('/' , (req,res)=>{

    console.log("Welcome");

    const data = {
        message : 'Welcome to Api'
    }

    res.json(data);

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log("server started"))