const workoutRepo = require('../repositories/WorkoutRepository');
const categoryRepo = require('../repositories/CategoryRepository');
let Validator = require('validatorjs');

const getWorkouts = async () => {
    return workoutRepo.getWorkouts();
}

const createWorkout = async (data) => {
    let rules = {
        workout_name: 'required|max:50',
        category_ids: 'required|array',
        difficulties: 'required|array',
        description: 'required',
        image_link: 'required|url',
        video_link: 'required|url',
        is_home: 'boolean',
        is_duration_based: 'boolean',
        'difficulties.*.difficulty': 'required',
        'difficulties.*.duration': 'integer',
        'difficulties.*.repetitions': 'integer',
        'difficulties.*.sets': 'integer',
    };

    // Validate the data input
    let validation = new Validator(data, rules);
    if (validation.fails() === true) {
        throw { message: { validation_error: validation.errors.all() }, status_code: 400 }
    }

    // Check if workout name already exists
    existingWorkout = await workoutRepo.getWorkoutByName(data.workout_name);
    if (existingWorkout !== null && existingWorkout !== undefined) {
        throw { message: { error: "The workout name already exists" }, status_code: 400 }
    }

    // Get list of categories
    let categories = [];
    for (const categoryID of data.category_ids) {
        let category = await categoryRepo.getCategoryByID(categoryID);
        if (category === null || category === undefined) {
            throw { message: `Category with id ${data.category_id} does not exists`, status_code: 400 };
        }
        categories.push(category);
    }

    // Set the difficulties
    let difficulties = [];
    for (const d of data.difficulties) {
        difficulties.push({
            difficulty: d.difficulty,
            duration: d.duration,
            repetitions: d.repetitions,
            sets: d.sets,
        })
    }

    // Save workout
    const workout = {
        workout_name: data.workout_name,
        description: data.description,
        image_link: data.image_link,
        video_link: data.video_link,
        is_home: data.is_home,
        is_duration_based: data.is_duration_based,
        categories: categories,
        difficulties: difficulties,
    };

    await workoutRepo.createWorkout(workout);
}

const getWorkoutByWorkoutID = async (workoutID) => {
    let workoutEntity = await workoutRepo.getWorkoutByID(workoutID);
    if (workoutEntity === null || workoutEntity === undefined) {
        return {}
    }

    return workoutEntity
}

const getWorkoutByCategoryID = async (categoryID) => {
    let workoutEntity = await workoutRepo.getWorkoutByCategoryID(categoryID);
    if (workoutEntity === null || workoutEntity === undefined) {
        return []
    }

    return workoutEntity
}



module.exports = {
    getWorkouts,
    getWorkoutByWorkoutID,
    createWorkout,
    getWorkoutByCategoryID
}