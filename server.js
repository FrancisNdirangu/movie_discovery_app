// Initialize dotenv immediately
import "dotenv/config";

// Import your other packages
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
