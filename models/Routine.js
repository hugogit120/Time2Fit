const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routineSchema = new Schema({
title : String,
image : String,
description : String
});

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;