const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });
// timestamps will add and update property when was 

// Workout, the name of the collection (table, it will pluralize it -> workouts)
module.exports = mongoose.model('Workout', workoutSchema);
