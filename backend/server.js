const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/notesDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const noteRoutes = require("./routes/notes");
app.use("/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});