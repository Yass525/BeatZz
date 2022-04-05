var express = require('express');
var app=express();
var bodyparser = require('body-parser');
const scrapRoute =require ('./Routes/scrap.route');
const searchRoute =require ('./Routes/search.route');


app.use(bodyparser.json());
app.use('/scrap',scrapRoute);
app.use('/search',searchRoute)


const PORT =  3005
app.listen(PORT,()=>{console.log("server running on port "+PORT)})
module.exports=app;

