const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');

const jokeRoutes = require("./routes/jokeRoutes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

connectDB();

app.use(
    express.json({
       extended: false,
    })
);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jokes Submit Microservice API',
            version: '1.0.0',
            description: 'API documentation for the Jokes Submit Microservice',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/joke', jokeRoutes);

app.listen(PORT, () => {
   console.log(`submit jokes microservice running on port ${PORT}`);
});