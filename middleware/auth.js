require('dotenv').config();

const reqApiKey = process.env.API_KEY;

const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey && apiKey === reqApiKey) {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
};

module.exports = authMiddleware;
