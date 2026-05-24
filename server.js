// Initialize dotenv immediately
import "dotenv/config";

// Import your other packages
import express from "express";
import axios from "axios";

const search_url = "https://api.themoviedb.org/3/search/movie";
const bearer_token = process.env.API_KEY;
const config = {
  headers: {
    accept: 'application/json',
    Authorization : ` Bearer ${bearer_token}`
  }
};

const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
