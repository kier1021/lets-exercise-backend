const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/WorkoutController');

router.get('/:workout_id', workoutController.getWorkoutByWorkoutID);
router.post('/', workoutController.createWorkout);


module.exports = router;