
const workoutService = require('../services/WorkoutService')

const getWorkouts = async (req, res, next) => {
    try {

        let result = await workoutService.getWorkouts()
        let response = {
            data: result
        }

        res.json(response);
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

const getWorkoutByWorkoutID = async (req, res, next) => {
    try {
        let result = await workoutService.getWorkoutByWorkoutID(req.params.workout_id)
        let response = {
            data: result
        }

        res.json(response);
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

const createWorkout = async (req, res, next) => {
    try {
        const data = req.body;
        await workoutService.createWorkout(data);

        res.json({ message: 'Workout successfully created!' });
    } catch (err) {
        console.error(`Error while creating workout category`, err.message);
        next(err);
    }
}

module.exports = {
    getWorkouts,
    getWorkoutByWorkoutID,
    createWorkout
}