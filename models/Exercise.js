const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
title : String,
description : String,
image : String,
categories : [String],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;


