const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');
const Exercise = require('../models/Exercise');
const User = require('../models/User')

//GET routine page:
router.get('/add', function (req, res, next) {
  res.render('routines/routine-add');
});

router.post('/add', (req, res, next) => {
  const { title, description } = req.body;
  const owner = req.session.currentUser._id;
  const newRoutine = new Routine({ title, description, owner })
  newRoutine.save()
    .then((routine) => {
      console.log(routine);
      res.redirect('/private/profile');
    })
    .catch((error) => {
      console.log(error);
    })
});

//hago get para entrar en la rutina
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Routine.findById(id).populate("exercises")
    .then((routine) => {
      User.findById(req.session.currentUser._id)
        .populate('exercises')
        .then(user => {
          const exercises = user.exercises
          res.render('routines/routine-detail', { routine, exercises });
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log(error);
    })
})

router.post('/:routineId/exercise/:exerciseId/add', (req, res, next) => {
  const { routineId, exerciseId } = req.params;
  Routine.findById(routineId).then(routine => {
    if (!routine.exercises.includes(exerciseId)) {
      console.log("trueeeee")
      Routine.findByIdAndUpdate(routineId, { $push: { exercises: exerciseId } }, { new: true })
        .then(routine => {
          res.redirect(`/routines/${routineId}`)
        })
    } else {
      res.redirect(`/routines/${routineId}`)
    }
  })
})

/* router.get('/exercise/:id', (req, res, next) => {
  const { id } = req.params;
  Exercise.findById(id)
    .then((exercise) => {
      res.render('private/home-detail', exercise)
    })
}) */




module.exports = router;