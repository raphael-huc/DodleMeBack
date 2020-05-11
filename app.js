var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());



const User = require('./src/users');

// Connexion à la base dodleme sur mongodb
const mongoose = require('mongoose');
const uri = "mongodb+srv://DodleMe_admin:dodleme@dodleme-3tvuz.mongodb.net/dodleme?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () =>
{
    console.log("connexion est établie");
})
.on('error', (error) => {
    console.warn('Erreur durant la connexion', error)
});


// Sauvegarde d'un utilisateur
//const user = new User({nomUser: "Utilisateur 2", nom: "nom2", prenom: "prenom2"});
//user.save();
let user1 = new User();
// Recherche d'une valeur par un de ses attributs
User.find({nomUser:'Jean'}).then((users) => {
    user1 = new User(users[0]);
    console.log(users[0]);

    // Update user1
    user1.set('nomUser', "xXJeanDu82Xx");
    user1.save().then( () => {

        // Recherche d'une valeur par un de ses attributs, ne fonctionne pas, voir pourquoi
        User.findById({_id:user1._id}).then((user) => {
            console.log(user1._id);
            console.log(user);
        })

    });
})






/*
client.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function(error, db) {
        if(error) throw error;
        db.collection("UtilisateurTest").find().toArray(function(error, results) {
            if (error) throw error;

        results.forEach(function(i, obj) {
            console.log(
                "ID : " + obj._id.toString() + "\n" +
                "NomUtilisateur : " + obj.NomUtilisateur + "\n" +
                "Nom : " + obj.Nom + "\n" +
                "Prénom : " + obj.Prenom + "\n"
            );
        });
    });
});

client
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(db => {
        app.locals.db = db;
        console.log("Connexion réussie !");

    })
    .catch(err => {
        console.log(err.message);
    });*/




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
