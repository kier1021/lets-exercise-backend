const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectMongo = require('./src/db/MongoDB');

// Set path to .env file
dotenv.config({ path: './.env' });

// Connect to mongo DB
connectMongo();

const app = express();
const port = process.env.APP_PORT || 3000;

const workoutRouter = require('./src/internal/workout/routes/WorkoutRouter');
const categoryRouter = require('./src/internal/workout/routes/CategoryRouter');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})

// Register routes
app.use('/workout', workoutRouter);
app.use('/category', categoryRouter);


// Error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.status_code || 500;
    res.status(statusCode).json({ 'message': err.message });

    return;
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Let's Exercise App listening at http://localhost:${port}`)
});