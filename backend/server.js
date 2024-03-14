const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routers");
const PORT = process.env.PORT || 5000;

const db = require("./dbConfig");
db.connect();

// Set up CORS middleware
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

// Define routes
app.use("/api", router);

// Serve static files
app.use(express.static("build"));

// Serve index.html for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Stack Overflow Clone is running on PORT No ${PORT}`);
});
