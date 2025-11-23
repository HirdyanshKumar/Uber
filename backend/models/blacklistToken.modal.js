const moongoose = require('mongoose');


const blacklistTokenSchema = new moongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 86400
    }

});

const blacklistToken = moongoose.model('BlacklistToken',blacklistTokenSchema);

module.exports = blacklistToken;