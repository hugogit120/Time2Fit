const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const routineSchema = new Schema({
    title: {
        type: String,
        default: "Routine"
    },
    image: String,
    description: String,
    owner: {
        type: ObjectId,
        ref: "User"
    },
    exercises: [{
        type: ObjectId,
        ref: "Exercise"
    }]

});

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;