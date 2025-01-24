const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  character: { type: String, required: true },
  mood: { type: String, required: true },
  ambedkarFan: { type: String, required: true },
  sixFeet: { type: String, required: true },
  aura: { type: Number, required: true },
  presencePower: { type: Number, required: true },
  level: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);