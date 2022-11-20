var Workout = require("../models/Workout");

const getWorkouts = async () => {
    try {
        const workouts = await Workout.find()
            .populate("workout_category");
        return workouts
    } catch (err) {
        console.error("WorkoutRepository.getWorkouts err:", err)
        throw err
    }
}

const createWorkout = async (data) => {
    var workout = Workout(data);

    try {
        const { _id } = await workout.save();
        return _id
    } catch (err) {
        console.error("WorkoutRepository.createWorkout err:", err)
        throw err
    }
}

const getWorkoutByID = async (id) => {
    try {
        const workout = await Workout.findOne({ _id: id })
            .populate('categories');
        return workout
    } catch (err) {
        console.error("WorkoutRepository.getWorkoutByID err:", err)
        throw err
    }
}


module.exports = {
    getWorkouts,
    createWorkout,
    getWorkoutByID
}