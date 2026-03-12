const router = require("express").Router();
const Note = require("../models/Note");
const note = require("../models/Note");

//get all notes
router.get("/", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

//create note
router.post("/", async (req, res) => {
    const note = new Note(req.body);
    const saved = await note.save();
    res.json(saved);
});

//delete note
router.delete("/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Npte deleted" });
});

//update note
router.put("/:id", async (req, res) => {
    try{
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedNote);
    } catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;