const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://NoteUser:chiku2002@cluster0.m9ethlt.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const noteRoutes = require("./routes/notes");
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Notes API is running 🚀");
});