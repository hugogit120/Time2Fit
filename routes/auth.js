const express = require("express");
const router = express.Router();

//Add the model 
const User = require("../models/User");

//requerimos bcrypt para encriptar los passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;



////////////////////SIGNUP//////////////////////////////
//Route del signup:
router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

// Recibimos datos del formulario  signup
//genera el salt y hace un hash del password 
//Crea un objeto User y redigire
router.post("/signup", (req, res, next) => {
    const { username, password, email, gender } = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    
// validamos si los valores de los inputs llegan vacíos
    if (username === "" || password === "") {
        res.render("auth/signup", {
            errorMessage: "The fields can't be empty"
        });
    return;
    }

    //busco en la BD si existe el username
    User.findOne({ username: username })
        .then(user => {
            if (user !== null) {
                res.render("auth/signup", {
                    errorMessage: "The username can't be repeated!"
                });
                return;
            }
        })
        .catch(error =>{
            console.log(error);
        });
        

            //busco en la BD si existe el email
    User.findOne({ email: email })
        .then(user => {
            if (user !== null) {
                res.render("auth/signup", {
                    errorMessage: "The email can't be repeated!"
                });
                return;
            }
        })
        .catch(error =>{
            console.log(error);
        });
/* const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt); */

        User.create({
            username: username,
            password: hashPass,
            email : email,
            gender : gender       
        })
        .then(() => {
            res.redirect("/");
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;