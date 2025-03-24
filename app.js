const express = require("express");
const path = require("node:path");

const app = express();

const indexRouter = require("./routes/indexRouter");

//connect ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//turn req.body into object
app.use(express.urlencoded({ extended: true}));

//connect static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//routes
app.use("/", indexRouter);

//error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: "Internal Server Error"})
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app listening to PORT: ${PORT}`);
});
