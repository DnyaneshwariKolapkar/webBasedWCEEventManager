const express = require('express');
const router = express.Router();
const {User, Temp} = require('../models/User.js');
const Calendar = require('../models/Calendar.js');
const auth = require('../middleware/auth.js');
const currDate = require('../middleware/chechDate');
const NodeCache = require('node-cache');
const myCache = new NodeCache()
const setendtime = require('../middleware/setendtime');

// router.post('/insertevent/:token', auth, async (req, res) => {
router.post('/insertevent', async (req, res) => {
    try{
        // const user = req.user;
        // const isAuthorized = await User.isAdminUser(user.id) || await User.isClubUser(user.id);
        const isAuthorized = true;
        if(isAuthorized){
            const calendar = new Calendar(req.body);
            // calendar.createdBy = user.name;
            // calendar.endtime = setendtime(calendar.starttime, calendar.duration);
            const checkIsAvailable = await Calendar.checkIsAvailable(calendar.date, calendar.starttime, calendar.endtime);
            if(checkIsAvailable) {
                await calendar.save();
                myCache.del('events');
                res.status(200).send(calendar);
            }
            else {
                res.status(400).send({error: 'Event is not available'});
            }
        }
        else{
            res.status(400).send({ error: 'Not authorized to access this resource' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.post('/deleteEvent', auth, async (req, res) => {
    try{
        const user = req.user;
        const isAdmin = await User.isAdminUser(user.id);
        if(isAdmin){
            const calendar = await Calendar.deleteEvent(req.body.name, req.body.date, req.body.starttime, req.body.endtime);
            if(calendar) {
                res.status(200).send(calendar);
            }
            else {
                res.status(400).send({error: 'Event not found'});
            }
        }
        else{
            res.status(400).send({ error: 'Not admin user' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.post('/requestToDelete', auth, async (req, res) => {
    try{
        const user = req.user;
        const isClubUser = await User.isClubUser(user.id);
        if(isClubUser){
            if(calendar.createdBy == user.email){
                const calendar = await Calendar.requestToDelete(req.body.name, req.body.date, req.body.starttime, req.body.endtime);
                if(calendar) {
                    res.status(200).send(calendar);
                }
                else {
                    res.status(400).send({error: 'Event not found'});
                }
            }
        }
        else{
            res.status(400).send({ error: 'Not club user' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.get('/getEvents', async (req, res) => {
    try{
        // const user = req.user;   
        if(myCache.has('events')){ 
            console.log('from cache');
            const events = await myCache.get('events');
            console.log(JSON.parse(events));
            res.status(200).send(JSON.parse(events));
        }
        else{
            // let Date = currDate();
            // console.log(Date);
            // console.log('from server');
            // const events = JSON.stringify(await Calendar.find( {date: {$gte: Date }}).sort({date: 1}));
            const events = JSON.stringify(await Calendar.find().sort({date: 1}));
            // myCache.set('events', events, 3600);
            // const data = myCache.get('events');
            res.status(200).send(events);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('/resetcache', async (req, res) => {
    try{
        myCache.del('events');
        res.status(200).send('cache reset');
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('/getEvents/:date', async (req, res) => {
    try{
        const events = await Calendar.find( {date: req.params.date});
        res.status(200).send(events);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});





module.exports = router;