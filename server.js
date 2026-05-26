// Initialize dotenv immediately
import "dotenv/config";

// Import your other packages
import express from "express";
import axios from "axios";

const search_url = "https://api.themoviedb.org/3/search/movie";
const bearer_token = process.env.API_KEY;
// commented out the config below since im passing it directly in each axios request below
// const config = {
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${bearer_token}`,
//   },
// };

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
  //console.log(searchResponse.data);
  //res.json(searchResponse.data);

  const movieSearchResults = searchResponse.data.results;
  const totalResults = searchResponse.data.total_results;
  const totalPages = searchResponse.data.total_pages;
  console.log(movieSearchResults);
  console.log(`the total number of results ${totalResults}`)
  console.log(`the total number of pages ${totalPages}`)
  // res.json(movieSearchResults);

  // Object.entries(movieSearchResults).forEach(([outerKey, { id, title, release_date, poster_path, overview, vote_average, vote_count, original_language }]) => {
  //   console.log(`${outerKey}: id=${id}, title=${title}, release_date=${release_date}, poster_path=${poster_path}, overview=${overview}, vote_average=${vote_average}, vote_count=${vote_count}, original_language=${original_language}`)
  // })
  res.locals.movieSearchResults = movieSearchResults;
  res.locals.totalResults = totalResults;
  res.locals.totalPages = totalPages;
  res.render('results');
});

// commented out this get request since we are now using it from inside the post request above
// app.get("/search", async (req, res) => {
//   try {
//     const request = await axios.get(search_url, {
//       params: {
//         query: "The Matrix",
//         include_adult: false,
//         language: "en-US",
//       },
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${bearer_token}`,
//       },
//     });
//     res.json(request.data);
//     console.log(request.data);
//   } catch (error) {
//     console.error(error);
//   }
// });

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
