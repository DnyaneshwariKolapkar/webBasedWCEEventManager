const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');


// User Information Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    usertype: {
        type: String,
        enum: ['user', 'clubuser', 'adminuser'],
        default: 'user'
    },
    clubName: {
        type: String
    },
    clubFile: {
        type: String
    },
    token: {
        type: String,
        default: ''
    }
})


// Temp Information Schema gets cleared when user is verified
const tempSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    randomstring: {
        type: String,
        required: true
    }
})


// Temp Information Schema gets cleared when user is promoted to club user else when request for clubuser is rejected
const tempClubSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    clubName: {
        type: String,
        required: true
    },
    clubFile: {
        type: String,
        required: true
    },
})


// user information gets some channges before storing it to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})


// generate token for user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    user.token = token;
    await user.save();
}


// check if user is verified by user email
userSchema.statics.isUserVerified = async function (email) {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    return user.isVerified;
}


//  Login User
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password is incorrect');
    }
    return user;
}


// create random string for mail verification
tempSchema.methods.createString = async function () {
    const temp = this;
    const string = crypto.randomBytes(4).toString('hex');
    temp.randomstring = string;
    await temp.save();
}


// after clicking link in mail, it checks for temporary user in Temp schema and if found, it updates the user to verified user
tempSchema.statics.findForVerification = async function (id, randomstring) {
    const temp = await Temp.findOne({ userID: id, randomstring: randomstring });
    await Temp.deleteOne({ userID: id, randomstring: randomstring });
    if (!temp) {
        console.log('Temp not found');
    }
    else {
        return temp;
    }
}
userSchema.statics.VerifyUser = async function (id) {
    await User.findOneAndUpdate({ _id: id }, { isVerified: true });
    const user = await User.findById(id);
    if (!user) {
        console.log('User not found');
    }
    else {
        console.log('User Verified');
        return user;
    }
}


// Promote User to Club User
userSchema.statics.createClubUser = async function (tempclub) {
    const user = await User.findOneAndUpdate({ email: tempclub.userEmail, isVerified: true }, { usertype: 'clubuser', clubName: tempclub.clubName, clubFile: tempclub.clubFile });
    if (!user) {
        console.log('User not found');
    }
    else {
        console.log('User Promoted to Club User');
        return user;
    }
}


// check if user is admin user
userSchema.statics.isAdminUser = async function (id) {
    const user = await User.findOne({ _id: id, usertype: 'adminuser' });
    if (!user) {
        console.log('not admin user');
    }
    else {
        return true;
    }
}


// check if user is club user
userSchema.statics.isClubUser = async function (id) {
    const user = await User.findOne({ _id: id, usertype: 'clubuser' });
    if (!user) {
        console.log('not club user');
    }
    else {
        return true;
    }
}


const User = mongoose.model('User', userSchema);
const Temp = mongoose.model('Temp', tempSchema);
const TempClub = mongoose.model('TempClub', tempClubSchema);

module.exports = { User, Temp, TempClub };