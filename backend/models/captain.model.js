const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            required:true,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'Password must be at least 6 characters long'],
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate number must be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            required:true,
            enum: ['car','motorcycle','auto'],
        }
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
        
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {
            _id: this._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
    );
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const CaptainModel = mongoose.model('Captain',captainSchema);

module.exports = CaptainModel;