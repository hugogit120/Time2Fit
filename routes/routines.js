const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

//GET routine page:
router.get('/add', function(req, res, next) {
  res.render('routines/routine-add'); 
});

router.post('/add', (req, res, next) => {
    const { title, description } = req.body;
    const owner = req.session.currentUser._id;
  
    const newRoutine = new Routine({ title, description, owner})
    newRoutine.save()
    .then((routine) => {
        console.log(routine);
      res.redirect('/private/home');
    })
    .catch((error) => {
      console.log(error);
    })
  });


module.exports = router ;