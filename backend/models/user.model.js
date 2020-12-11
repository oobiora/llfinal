const mongoose = require('mongoose');
const Package = require('./workout.model')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

//schema for user model, includes username, -- id --, and workouts
const roleSchema = new Schema({
    Role: {
        type: String, 
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    

})
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    roles: {
        type: roleSchema,
        default: {type: 'user'}
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    workouts: {type: [Package.packageSchema], required: false},
}, {
    timestamps: true,
});

// Hashes User Password on creation
userSchema.pre('save', function(next){
    if (!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password,10,(err, passwordHash)=>{
        if (err){
            return err
        }
        this.password = passwordHash;
        next();
    })
    
})



const user = mongoose.model('User', userSchema);
module.exports = user