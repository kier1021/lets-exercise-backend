const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/WorkoutController');


router.get('/', workoutController.getWorkouts);
router.post('/', workoutController.createWorkout);
router.get('/:workout_id', workoutController.getWorkoutByWorkoutID);


module.exports = router;