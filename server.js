const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const postRoutes = require('./routes/post-routes')
const postApiRoutes = require('./routes/api-post-routes')
const contactRoutes = require('./routes/contsct-routes')
const createPath = require('./helpers/create-path')
require('dotenv').config()


const app = express();

app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connect to DB"))
  .catch((err) => console.log(err));


app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(methodOverride("_method"));
app.use(express.static("styles"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});


app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);


app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
