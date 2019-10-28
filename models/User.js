const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const userSchema = new Schema({
    username: { type: String, required : true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image : String, //
    gender: { type: String, required: true },
    age : Number,
    height: Number,
    weight: Number,
    exercises:[{type: ObjectId, ref:"Exercise"}]
    
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
 