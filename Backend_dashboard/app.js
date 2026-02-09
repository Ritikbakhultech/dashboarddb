const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const app = express();


connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

const postRoutes = require("./routes/Postroutes");
app.use("/api/posts", postRoutes);


const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("App is running");
});

module.exports = app;
