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
});


const WorkoutSchema = new Schema({
    workout_name: { type: String, required: true },
    description: { type: String, required: true },
    image_link: { type: String },
    video_link: { type: String },
    is_home: { type: Boolean },
    is_duration_based: { type: Boolean },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    difficulties: [WorkoutDifficultySchema]
}, {
    collection: 'workout',
});

module.exports = mongoose.model("Workout", WorkoutSchema);