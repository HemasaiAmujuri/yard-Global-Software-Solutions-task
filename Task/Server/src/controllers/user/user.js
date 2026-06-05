const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/userSchema');
const UserList = require('../../models/userList');


const router = express.Router();


const authController = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email : email});
        if(existingUser){
            return res.status(400).json({ success: false, message: 'User already exists, please Login'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,   
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating user', error });
    }
};

const loginController = async(req, res) => {
    const {email, password} = req.body; 
    try {
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({ success: false, message: 'User not found, please Sign Up'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ success: false,  message: 'Invalid credentials'});
        }
        return res.status(200).json({ success: true, message: 'Login successful'});
    } catch (error) {
        return res.status(500).json({ success: false, message : "Internal server error", error});
    }
};


const getUserList = async(req, res) => {
    try {
        const users = await UserList.find();    
        return res.status(200).json({ success: true, data : users, message : "Data Retrieved Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};




module.exports = {authController, loginController, getUserList};
