const mongoose = require('mongoose');

const userListSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {    
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    },
},
    {
        timestamps: true
    }
);