const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json("Bonjour!");
});

const blogRoutes = require("./routes/blogs");
server.use("/blogs", blogRoutes);

// -------------- PLEASE IGNORE THIS ------------------------
// const fingerprintRoutes = require("./routes/fingerprint");
// server.use("/fingerprint", fingerprintRoutes);

module.exports = server;
