const dotenv = require('dotenv');

// Set path to .env file
dotenv.config({ path: './.env' });

const env = process.env;

const mongoConfig = {
    conn_string: env.MONGO_CONN_STRING,
};

module.exports = mongoConfig;