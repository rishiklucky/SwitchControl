const router = require("express").Router();
const Settings = require("../models/Settings");

// GET settings
router.get("/", async (req, res) => {
  res.set("Cache-Control", "no-store"); // avoid browser cache

  let data = await Settings.findOne();
  if (!data) data = await Settings.create({});
  res.json(data);
});

// UPDATE settings
router.post("/update", async (req, res) => {
  const updated = await Settings.findOneAndUpdate(
    {},
    { $set: req.body },
    { new: true, upsert: true }
  );

  res.json(updated);
});

module.exports = router;
