const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const index = async (req, res) => {
    try {
        // sort descending order
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json(workouts);
    }catch(error) {
        res.status(400).json({error: error.message});
    }
};

// get a single workout
const show = async (req, res) => {
    const id = req.params.id;
    // CHECK IF ID IS VALID
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'});
    try {
        const workout = await Workout.findById(id);
        if(!workout) return res.status(404).json({error: 'No such workout'});
        res.status(200).json(workout);
    }catch(error) {
        res.status(400).json({error: error})
    }
}

// create new workout
const create = async (req, res) => {
    const {title, load, reps} = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push('title');
    }
    if(!load) {
        emptyFields.push('load');
    }
    if(!reps) {
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }

    try {
        // add document to db
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout);
    }catch(error) {
        res.status(400).json({error: error.message});
    }
}

// delete a workout
const destroy = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'});
    try {
        const workout = await Workout.findOneAndDelete({_id: id});
        if(!workout) return res.status(404).json({error: 'No such workout'});
        res.status(200).json(workout);
    }catch(error) {
        res.status(400).json({error: error});
    }
}

// update a workout
const update = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'});
    try {
        const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body}, {new: true});
        if (!workout) return res.status(404).json({error: 'No such workout'});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    index,
    show,
    create,
    destroy,
    update
}