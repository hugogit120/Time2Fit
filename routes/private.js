const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Routine = require('../models/Routine');

const { loggedIn, notLoggedIn } = require('../middlewareForAuth/middlewareAuth')
// GET home page.:
router.get('/home', notLoggedIn,  async (req, res, next) => {
 const allExercise = await Exercise.find()
  res.render('private/home', { exercise: allExercise });
});

// GET exercises details:
router.get('/exercise/:id', (req, res, next) => {
  const id = req.params.id
  console.log(id);
  Exercise.findById(id)
    .then(exercise => {
      console.log(exercise)
      res.render('private/home-detail', exercise);
    })
    .catch(error => {
      console.log(error)
    })
});



//GET profile page:
router.get('/profile', notLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id
  const user = await User.findById(userId)
  const routines = await Routine.find({owner: userId})
  routines.reverse()
  res.render('private/profile', { user, routines}); 
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

//borro usuario y destruyo sesión 
//En la vista he de hacerla con un for.

router.post('/profile/delete', (req, res, next) => {
  console.log('hola')
  const id = req.session.currentUser._id;
  User.findByIdAndRemove(id)
    .then(() => {
      delete req.session.currentUser
      res.redirect('/')
    })
    .catch((error) => console.log(error))
})

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

   //en formulario poner ruta completa porque es html y no es javascript
//Recibe por params el ID del ejercicio, lo sube a la base de datos del usuario y renderiza la misma pagina home

// buscar el usuario en la base de datos y guardarlo en una variable
  // recogemos la lsita de ejercicios favoritos del user (array)
  // hacemos push del ejercicio (id) al array
  // update del user en la base de datos
  // update del user en la current session
  // redirect o render a la misma pagina
router.post('/add/favorite/:id', async(req, res, next) => {  
  const id = req.params.id;
  //console.log(id);
  const currentUser = req.session.currentUser;

  console.log(currentUser.exercises.includes(id))

 if (currentUser.exercises.includes(id)) {
    res.redirect('/private/home')
  }
  else {
   const user = await User.findByIdAndUpdate(currentUser._id, { $push: { exercises: id } }, { new: true })
   req.session.currentUser = user
   res.redirect('/private/home')
  }
});

router.post('/logout', notLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser)
  delete req.session.currentUser
  res.redirect('/')
});

router.post('/routines/delete/:id', (req, res, next) => {
  const {id} = req.params;
  Routine.findByIdAndRemove(id)
    .then(() => res.redirect("/private/profile")
  )
    .catch((error) => console.log(error)
  )

});


module.exports = router;