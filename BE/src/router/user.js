const express = require('express');
const router = express.Router();
const { User, Temp, TempClub } = require('../models/User.js');
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth.js');
const { route } = require('express/lib/application');
const path = require('path');
const sendEmail = require('../middleware/nodemailer.js');
const { log } = require('console');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const uploadFile = require('../middleware/fileupload.js');


router.get('/', async (req, res) => {
    res.send("Ritesh's server");
})

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.generateAuthToken();
        const temp = new Temp({ userID: user._id });
        await temp.createString();
        await user.save();
        await temp.save();
        const link = user._id + '/' + temp.randomstring;
        await sendEmail(link, user);
        res.status(201);
        res.send({
            message: "User created",
        });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400);
            res.send("Email already exists");
        }
        else {
            res.status(400);

            res.send(error);
        }
    }
})

router.post('/resendEmail', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const temp = await Temp.findOne({ userID: user._id });
        const link = user._id + '/' + temp.randomstring;
        sendEmail(link, user);
        res.send('Email sent');
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const check = await User.isUserVerified(req.body.email);
        if (check) {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            if (user) {
                await user.generateAuthToken();
                // myCache.del(user._id.toString());
                // myCache.set(user._id.toString(), user.token);
                res.cookie("JWT", "token", { httpOnly: true });
                res.status(200).send(user);
            }
            else {
                res.status(400).send({
                    error: "Invalid Credentials"
                });
            }
        }
        else {
            res.status(401).send({
                error: "User not verified"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})


router.get('/verifyemail/:id/:string', async (req, res) => {
    try {
        const user_id = req.params.id;
        const randomstring = req.params.string;
        console.log({ user_id, randomstring });
        const temp = await Temp.findForVerification(user_id, randomstring);
        if (temp) {
            const user = await User.VerifyUser(temp.userID);
            if (user) {
                console.log('user verified');
                console.log({ user });
                // res.send('user verified');
                res.sendFile(path.join(__dirname, '../public/verified.html'));
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.get('/users/me/:id', auth, async (req, res) => {
    try {
        res.send(req.user);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.get('/users/me/logout/:id', auth, async (req, res) => {
    try {
        req.user.token = '';
        await req.user.save();
        res.send('logged out successfully');
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/applyforclubuser', auth, async (req, res) => {
    try {
        const user = req.user;
        const isexist = await TempClub.findOne({ userEmail: user.email });
        if (!isexist) {
            console.log(req.body);
            const clubdata = new TempClub(req.body);
            clubdata.save();
            res.send('applied for club user');
        }
        else {
            console.log('already applied');
            res.send('already applied for club user');
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.post('/uploadfile', auth, uploadFile.single('file'), (req, res) => {
    try {
        console.log(req.file);
        res.status(200).send(req.file.filename);
    }
    catch (error) {
        console.log(error);
        res.status(500).send
    }
})

router.get('/clubuserRequests', async (req, res) => {
    try {
        const requests = await TempClub.find({});
        res.send(requests);
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/me/promotetoclubuser/:response', auth, async (req, res) => {
    try {
        const user = req.user;
        if (user.usertype == 'adminuser') {
            if (req.params.response == 'accept') {
                const email = req.body.email;
                const tempclub = await TempClub.findOne({ userEmail: email });
                if (tempclub) {
                    const user = await User.createClubUser(tempclub, req.token);
                    res.send('promoted to club user');
                    if (user) {
                        const temp = await TempClub.findOneAndDelete({ userEmail: email });
                        if (temp) {
                            console.log('club user request deleted');
                        }
                    }
                }
                else {
                    res.send('no request found');
                }
            }
            else if (req.params.response == 'reject') {
                const email = req.body.email;
                const temp = await TempClub.findOneAndDelete({ userEmail: email });
                if (temp) {
                    res.send('club user request deleted');
                }
                else {
                    res.send('no request found');
                }
            }
        }
        else {
            res.send('Only admin can promote to club user');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.get('/current/clubusers', auth, async (req, res) => {
    try {
        const user = req.user;
        if (user.usertype == 'adminuser') {
            const clubusers = await User.find({ usertype: 'clubuser' });
            res.send(clubusers);
        }
        else {
            res.send('Only admin can see club users');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.post('/demoteclubuser', auth, async (req, res) => {
    try {
        const user = req.user;
        if (user.usertype == 'adminuser') {
            const email = req.body.email;
            console.log(req.body);
            const clubuser = await User.findOne({email: email});
            if(clubuser){
                clubuser.usertype = 'user';
                await clubuser.save();
                res.send('demoted to user');
            }
            else{
                res.send('no club user found');
            }
        }
        else {
            res.send('Only admin can demote club user');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

module.exports = router;