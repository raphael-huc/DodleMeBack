var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

// Permet d'autoriser les requêtes REST
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.listen(3000, function() {
    console.log("Server running...");
})

// Tester api REST
app.get('/api/test', function(req,res) {
    res.status(200).json("ça marche !");
})
