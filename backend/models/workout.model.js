const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Schema for one particular workout video 
const workoutSchema = new Schema({
    key: { 
        type: String,
        required: true
    },
    block: {
        type: Number,
        required: true
    },
    sub_group: {
        type: String,
        enum: ['running', 'heel_lowers', 'exit_blk', 'toe_pulses', 'long_workouts', 'side_lying', 'short_workouts', 'arm_lowers', 'arm_lowers45', 'arms_totheSide', 'hundreds'],
        required: false
    },
    level: {
        type: [{
            type: Number,
            enum: [0, 1, 2, 3, 4]
        }],
        required: true
    },
    band_info : {
        red : Number,
        black : Number
    },
    pain_settings : {
        knee_pain : Boolean,
        pregnant : Boolean
    },
    description: {
        type: String,
        required: false
    },
    focus : {
        type: [{
            type: String,
            enum : ['cardio', 'strength', 'slim', 'tone', 'general']
        }],
        required : false,        
    }
    
})








// Schema for a package of workouts
const userworkoutsSchema = new Schema({
    length : {type: Number, required: true }, // number of workout objects
    data: {type: [workoutSchema], required: true} // array of workout objects
}, {
    timestamps: true,
});

const workout_package = mongoose.model('Package', userworkoutsSchema);
const workout = mongoose.model('Workout', workoutSchema);



module.exports.packageSchema = userworkoutsSchema;
module.exports.workout = workout ;
module.exports.package = workout_package;