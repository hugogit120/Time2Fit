const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
title : String,
description : String,
image : String,
category : String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;


