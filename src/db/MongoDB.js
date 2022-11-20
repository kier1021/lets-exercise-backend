const mongoose = require("mongoose");
const mongoConfig = require('../configs/MongoConfig')

connectMongo = () => {
    mongoose.connect(mongoConfig.conn_string, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

module.exports = connectMongo;