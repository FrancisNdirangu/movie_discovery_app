// Initialize dotenv immediately
import "dotenv/config";

// Import your other packages
import express from "express";
import axios from "axios";

const search_url = "https://api.themoviedb.org/3/search/movie";
const bearer_token = process.env.API_KEY;
const config = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${bearer_token}`,
  },
};

const app = express();
const port = 3000;

// setting the static folder in express
app.use(express.static("public"));

// 1. set the engine which is ejs in this case
app.set("view engine", "ejs");

// 2. set the folder where your views live
app.set("views", "./views");

// middleware to parse from data 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
  
});

app.post('/submit', async(req, res) => {
  // access the form data from index.ejs
  const movieSearched = req.body.movieNameInput;
  console.log(movieSearched);
  //res.send(`Movie searched for: ${movieSearched}`);
  const searchResponse = await axios.get(search_url, {
    params: {
      query: movieSearched,
      include_adult: false,
      language: "en-US"
    },
    headers: {
      accept: "application/json",
      Authorization: ` Bearer ${bearer_token}`
    }
  });
  console.log(searchResponse.data);
  res.json(searchResponse.data);
  
});

app.get("/search", async (req, res) => {
  try {
    const request = await axios.get(search_url, {
      params: {
        query: "The Matrix",
        include_adult: false,
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
    });
    res.json(request.data);
    console.log(request.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
