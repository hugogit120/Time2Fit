const express = require("express");
const router = express.Router();

//Add the model 
const User = require("../models/User");

//Middlewares
const {
    loggedIn,
    notLoggedIn
} = require("../middlewareForAuth/middlewareAuth");

//requerimos bcrypt para encriptar los passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

////////////////////SIGNUP//////////////////////////////
//Route del signup con middleware de logeado o no:
router.get("/signup", loggedIn, (req, res, next) => {
    res.render("auth/signup");
});

// Recibimos datos del formulario  signup
//genera el salt y hace un hash del password 
//Crea un objeto User y redigire
router.post("/signup", async (req, res, next) => {
    const {
        username,
        password,
        email,
        gender
    } = req.body;
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
    User.findOne({
        username: username
    })
        .then(user => {
            if (user !== null) {
                res.render("auth/signup", {
                    errorMessage: "The username can't be repeated!"
                });
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });

    //busco en la BD si existe el email
    User.findOne({
        email: email
    })
        .then(user => {
            if (user !== null) {
                res.render("auth/signup", {
                    errorMessage: "The email can't be repeated!"
                });
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
    /* const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt); */
    try {
        const user = await User.create({
            username: username,
            password: hashPass,
            email: email,
            gender: gender
        })
        //aparte de crear el usuario tenemos que crear la sesión para poder entrar en la parte privada, por eso hacemos req.session.currentUser = User para asociar usuario creado y sesión:
        req.session.currentUser = user
        res.redirect("/private/home");
    } catch (error) {
        console.log(error);

    }



});

////////////////LOGIN////////////////////
//Route del login:
router.get("/login", loggedIn, (req, res, next) => {
    res.render("auth/login");
});

router.post("/login", (req, res, next) => {

    const theUsername = req.body.username;
    const thePassword = req.body.password;

    if (theUsername === "" || thePassword === "") {
        res.render("auth/login", {
            errorMessage: "Please enter username and password to sign up."
        });
        return;
    }

    // buscamos en la BD si existe un username con los datos del user que vienen del form
    // si no lo encuentra, nos dice que el user no existe
    // sino, nos devuelve el user
    // usamos el método compareSync para hacer hash del form input y compararlo con el password guardado en la BD
    User.findOne({
        "username": theUsername
    })
        .then(user => {
            if (!user) {
                res.render("auth/login", {
                    errorMessage: "The username doesn't exist."
                });
                return;
            }

            if (bcrypt.compareSync(thePassword, user.password)) {
                // Save the login in the session!
                //the request object has a property called session where we can add the values we want to store on it. In this case, we are setting it up with the user’s information.
                // session is a cookie to keep the user data cuando esta logeado
                req.session.currentUser = user;
                res.redirect("/private/home");
                return;
            } else {
                res.render("auth/login", {
                    errorMessage: "Incorrect password"
                });
            }
        })
        .catch(error => {
            next(error);
        })
});


module.exports = router;