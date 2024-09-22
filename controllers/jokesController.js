const Joke = require('../models/jokeModel');

const submitJoke = async (req, res) => {
    try {
        const { joke, type } = req.body;

        const newJoke = new Joke({
            joke: joke,
            type: type,
            status: 'Pending'
        });

        const createdJoke = await newJoke.save();
        return res.status(201).json(createdJoke);

    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

const getNonModeratedJoke = async (req, res) => {
    try {
        const joke = await Joke.findOne({ status: 'Pending' }).exec();

        if (!joke) {
            return res.status(404).json({ message: 'No pending jokes found.' });
        }

        return res.status(200).json({ joke: joke });
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

const deleteModeratedJoke = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Joke.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Joke not found.' });
        }

        return res.status(200).json({ message: 'Joke deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedJoke = await Joke.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedJoke) {
            return res.status(404).json({ message: 'Joke not found.' });
        }

        return res.status(200).json(updatedJoke);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    submitJoke,
    getNonModeratedJoke,
    deleteModeratedJoke,
    changeStatus
}