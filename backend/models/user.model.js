const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, 'First name must be at leat 2 characters long'],
        },
        lastname:{
            type: String,
            required: true,
            minlength:[3, 'First name must be at leat 2 characters long'],
        }
    },
    email:{
        type: String,
        require: true,
        // unique: true,
        minlength: [5 , '   Email must must be at leat 5 characters long'],

    },
    password:{
        type:String,
        require: true,
        select: false,
    },
    socketId:{
        type: String,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}


userSchema.method.comparePassword = async function (password){

    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashedPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const usermodel= mongoose.model('User', userSchema);

module.exports = usermodel;
