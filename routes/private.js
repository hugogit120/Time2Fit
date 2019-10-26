const express = require('express');
const router = express.Router();
const user = require('../models/User');

// GET home page.:
router.get('/home', function(req, res, next) {
  res.render('private/home', { title: 'exercises' });
});


//GET profile page:
router.get('/profile', function(req, res, next) {
    const user = req.session.currentUser;
  res.render('private/profile', {user}); 
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