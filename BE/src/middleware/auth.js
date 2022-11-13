const jwt = require('jsonwebtoken');
const {User, Temp} = require('../models/User.js');
const NodeCache = require('node-cache');
const myCache = new NodeCache();


const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ','');
    // const token = req.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    try{
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        res.status(400).send({ error: 'Not authorized to access this resource' });
    }
}

module.exports = auth;