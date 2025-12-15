const router = require("express").Router();
const Settings = require("../models/Settings");

// GET settings
router.get("/", async (req, res) => {
  let data = await Settings.findOne();
  if (!data) data = await Settings.create({});
  res.json(data);
});

// UPDATE settings
router.post("/update", async (req, res) => {
  const {
    deviceStatus,
    onAngle,
    offAngle,
    autoOffTime,
    currentTime,
    offCommandId
  } = req.body;

  if (onAngle !== undefined && (onAngle < 0 || onAngle > 180)) {
    return res.status(400).json({ message: "Invalid ON angle" });
  }

  if (offAngle !== undefined && (offAngle < 0 || offAngle > 180)) {
    return res.status(400).json({ message: "Invalid OFF angle" });
  }

  const updated = await Settings.findOneAndUpdate(
    {},
    { deviceStatus, onAngle, offAngle, autoOffTime, currentTime, offCommandId },
    { new: true, upsert: true }
  );

  res.json(updated);
});

module.exports = router;
