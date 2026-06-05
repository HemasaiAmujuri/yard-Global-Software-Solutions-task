const mongoose = require('mongoose');

require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = encodeURIComponent(process.env.DB_PASSWORD);

console.log("DB_USERNAME:", username);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const dbUri =
    `mongodb+srv://${username}:${password}@cluster0.gxqhey0.mongodb.net/taskDB?retryWrites=true&w=majority`;

    console.log("Constructed DB URI:", dbUri);

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;