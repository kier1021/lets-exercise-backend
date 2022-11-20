const workoutRepo = require('../repositories/WorkoutRepository');
const categoryRepo = require('../repositories/CategoryRepository');


const getWorkouts = async () => {
    return workoutRepo.getWorkouts();
}

const createWorkout = async (data) => {
    // Get list of categories
    let categories = [];
    for (const categoryID of data.category_ids) {
        let category = await categoryRepo.getCategoryByID(categoryID);
        if (category === null || category === undefined) {
            throw { 'message': `Category with id ${data.category_id} does not exists` };
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
    return workoutEntity
}


module.exports = {
    getWorkouts,
    getWorkoutByWorkoutID,
    createWorkout,
}