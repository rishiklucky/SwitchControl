require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/settings", require("./routes/settings"));

app.listen(5000, () => console.log("Server running on port 5000"));
