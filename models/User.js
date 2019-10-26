const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required : true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image : String, //
    gender: { type: String, required: true },
    age : Number,
    heigh: Number,
    weight: Number,
    exercices: String,
    routines: String
    
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
 