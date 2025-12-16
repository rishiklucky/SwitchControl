require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db");

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- API ROUTES ----------
app.use("/api/settings", require("./routes/settings"));

// ---------- SERVE REACT BUILD ----------
app.use(
  express.static(path.join(__dirname, "public/build"))
);

// ---------- SPA FALLBACK (VERY IMPORTANT) ----------
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public/build", "index.html")
  );
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
