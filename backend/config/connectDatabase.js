const mongoose = require('mongoose');

const connnectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
        .then((con) => {
            console.log('Mongodb is connected to host ' + con.connection.host);
        }).catch((e) => {
            console.log('Mongodb connection error')
        });
}

module.exports = connnectDatabase;