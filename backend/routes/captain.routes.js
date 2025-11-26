const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authmiddleware = require('../middlewares/auth.middleware');
const captainController = require('../controllers/captain.controller');


router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name is must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], captainController.loginCaptain
);

router.get('/profile', authmiddleware.authCaptain, captainController.getProfile);

router.get('/logout', authmiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;