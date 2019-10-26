const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exersice');

// GET home page.:
router.get('/home', (req, res, next) => {
  Exercise.find()
      .then(allExercise => {
        res.render('private/home', { exercise: allExercise });
      })
      .catch(err => {
        console.log(err)
      })
});



//GET profile page:
router.get('/profile', function(req, res, next) {
    const user = req.session.currentUser;
  res.render('private/profile', {user}); 
});

// formulario para editar el perfil del usuario:
router.get('/profile/edit', (req, res, next) => {
  const user = req.session.currentUser
  res.render("private/profile-edit", {user}); //{user} para pasarlo a la view
});

//recibe los datos del formulario y los guarda en la base de datos
router.post('/profile/edit', (req, res, next) => {
  const { email, age, height, weight } = req.body;

  const user = req.session.currentUser;
  // console.log(user);
User.findByIdAndUpdate(user._id, { email, age, height, weight },{ new:true})
  .then(editedUser => {
    // console.log(user);
     req.session.currentUser = editedUser;
     res.redirect("/private/profile")
  })
});

//Recibe por params el ID del user, lo busca en la BD y renderiza detailles
router.get('/user/:id', (req, res, next) => { // user/:id ==> cualquier id
    // console.log('hola');
     let userId = req.params.id;
    // console.log(userId);
   User.findOne({'_id': userId})
     .then(user => {
       //console.log(user);
       res.render("private/profile", { user: user })// renderiza los details
     })
     .catch(next)
   });


module.exports = router;