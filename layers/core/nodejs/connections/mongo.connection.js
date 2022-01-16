const mongoose = require('mongoose');

let connection = null;

exports.connect = async (connectionString) => {
    if (connection == null) {
        connection = await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            socketTimeoutMS: 2000000,
            keepAlive: true
        });
    }
};