const mongoose = require('mongoose');

const jokeSchema = mongoose.Schema({
    joke: {
       type: String,
       required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
},{
    timestamps: true,
});

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;

