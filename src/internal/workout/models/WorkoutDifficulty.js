const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutDifficultySchema = new Schema({
    difficulty: {
        type: String,
        required: true,
        enum: ["Easy", "Intermediate", "Hard", "Expert"],
    },
    duration: { type: Number },
    repetition: { type: Number },
    sets: { type: Number },
}, {
    collection: 'workout_difficulty'
});

module.exports = mongoose.model("WorkoutDifficulty", WorkoutDifficultySchema);