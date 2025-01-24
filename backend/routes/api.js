const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/calculate", async (req, res) => {
  const { name, character, mood, ambedkarFan, sixFeet } = req.body;

  let aura = 50, 
      presencePower = 50;
  let level = "Mid";
  let additionalMessage = "";

  if (name.toLowerCase() === "vivek") {
    aura = 0;
    presencePower = 0;
  } else if (["raj aryan singh", "raj"].includes(name.toLowerCase())) {
    aura = 100;
    presencePower = 99;
    level = "Supreme";
  } else if (["ankit", "ankit yadav"].includes(name.toLowerCase())) {
    aura = 98;
    presencePower = 96;
    level = "Supreme";
  } else {
    if (ambedkarFan === "yes") aura -= 30;
    if (sixFeet === "yes") aura += 20;
    if (mood === "good") aura += 10;
    else if (mood === "bad") aura -= 10;

    // Set level based on aura
    if (aura >= 90) level = "Supreme";
    else if (aura >= 70) level = "Alpha";
    else if (aura >= 50) level = "The Slayer";
  }

  if (["ayush", "ayush tiwari"].includes(name.toLowerCase())) {
    additionalMessage = "Your aura is infinite in damarua.";
  }

  // Save the user data to the database
  const user = new User({
    name,
    character,
    mood,
    ambedkarFan,
    sixFeet,
    aura,
    presencePower,
    level,
  });
  await user.save();

  // Send response back to the client
  res.json({ aura, presencePower, level, additionalMessage });
});

module.exports = router;
