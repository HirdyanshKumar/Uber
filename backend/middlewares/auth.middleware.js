const userModal = require('../models/user.model')
const CaptainModel = require('../models/captain.model');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistToken = require('../models/blacklistToken.modal');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }
    const isBlacklisted = await blacklistToken.findOne({token:token})
    if (isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModal.findById(decoded._id);
        req.user = user;
        next();
    }catch(err){
        return res.status(400).json({message: 'Invalid token.'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }
    const isBlacklisted = await blacklistToken.findOne({token:token})
    if (isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await CaptainModel.findById(decoded._id);
        req.captain = captain;
        next();
    }catch(err){
        return res.status(400).json({message: 'Invalid token.'});
    }
};


