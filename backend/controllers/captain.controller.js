const CaptainModel=require('../models/captain.model');
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');
const blacklistToken = require('../models/blacklistToken.modal');

module.exports.registerCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vehicle}=req.body;


    const existingCaptain=await CaptainModel.findOne({email});
    if(existingCaptain){
        return  res.status(400).json({message:'Captain with this email already exists'});
    }


    const hashPassword = await CaptainModel.hashPassword(password);
    const captain = await captainService.registerCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });


    if(!captain){
        return res.status(500).json({message:'Failed to register captain'});
    }
    

    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(201).json({message:'Captain registered successfully',token});
};

module.exports.loginCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    
    const captain = await CaptainModel.findOne({email}).select('password');
    if (!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({captain,token});
};

module.exports.getProfile=async(req,res,next)=>{
    const captain = req.captain;
    if(!captain){
        return res.status(404).json({message:'Captain not found'});
    }
    res.status(200).json({captain});
};

module.exports.logoutCaptain=async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }
    await blacklistToken.create({token});
    res.clearCookie('token');
    return res.status(200).json({message:'Logged out successfully'});
};




