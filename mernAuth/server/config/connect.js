const mongoose = require("mongoose");
const { MONGO_URI } = require(".");

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database is connected successfully');
    } catch (err) {
        console.log('failure in database connection');
    }
};

module.exports = { connect }