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

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  // For all other requests, serve the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Stack Overflow Clone is running on PORT No ${PORT}`);
});
