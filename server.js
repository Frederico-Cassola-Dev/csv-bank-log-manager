const express = require("express");
const fileupload = require("express-fileupload");

require("dotenv/config");
const connectDb = require("./backend/dbConnection");

const app = express();

//* Routes
const uploadsRoute = require("./backend/routes/Uploads");
const categoriesRoute = require("./backend/routes/Categories");
const resumeRoute = require("./backend/routes/Resume");
const listsDBRoute = require("./backend/routes/ListsDB");
const selectedListDBRoute = require("./backend/routes/selectedListDB");

//! ??? Middlewares ???
app.use(express.static("frontend"));
app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", uploadsRoute);
app.use("/categories", categoriesRoute);
app.use("/resume", resumeRoute);
app.use("/listsDB", listsDBRoute);
app.use("/selectedListDB", selectedListDBRoute);

//* MongooseDB connection
connectDb();

//* Server connection
app.listen(3001, ()=> console.log("==> App is running on port 3001 <=="));