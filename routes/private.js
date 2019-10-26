const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET home page.:
router.get('/home', function(req, res, next) {
  res.render('private/home', { title: 'exercises' });
});


//GET profile page:
router.get('/profile', function(req, res, next) {
  const user = req.session.currentUser;
  res.render('private/profile', {user}); 
});

router.get('/profile/edit', (req, res, next) => {
  const user = req.session.currentUser;
  res.render('private/profile-edit', {user})
})

//recibe los datos del formulario y los guarda en la base de datos
router.post('/profile/edit', (req, res, next) => {
  const { email, age, height, weight } = req.body;

  const user = req.session.currentUser;
  User.findByIdAndUpdate(user._id, { email, age, height, weight }, { new: true })
    .then(editedUser => {              //igualamos el current user al usuario de la sesion, haciendo esto completamos la edicion del usuario
      req.session.currentUser = editedUser;  //quiere decir que al editar el usuario activo, los datos instantaneamente seran reemplazados por los datos editados.
      res.redirect('/private/profile')
    })
});

//Recibe por params el ID de la celibrity, lo busca en la BD y renderiza detailles
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