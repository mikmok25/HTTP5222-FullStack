const mongoose = require('mongoose');

const WeatherNewsSchema = new mongoose.Schema({
    city: String,
    weather: {
        description: String,
        temperature: Number,
    },
    news: [
        {
            title: String,
            description: String,
            url: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('WeatherNews', WeatherNewsSchema);
