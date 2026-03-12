import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const API = "http://localhost:5000/notes";

  // get notes
  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  // add note
  const addNote = async () => {
    await axios.post(API, { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  // delete note
  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  //update note
  const updateNote = async () => {
    await axios.put(`${API}/${editingId}`, {
      title: editingTitle,
      content: editingContent
    });

    setEditingId(null);
    setEditingTitle("");
    setEditingContent("");

    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <div className="bg-white p-6 rounded shadow mb-6">

        <input
          className="border p-2 w-full mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>

        {editingId && (
          <div className="bg-white p-4 rounded shadow mt-6">

            <h2 className="text-xl font-bold mb-2">Edit Note</h2>

            <input
              className="border p-2 w-full mb-2"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
            />

            <textarea
              className="border p-2 w-full mb-2"
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />

            <button
              onClick={updateNote}
              className="bg-green-500 text-white px-4 py-2 rounded">
              Update Note
            </button>
          </div>
        )}
      </div>


      <div className="grid gap-4">

        {notes.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded shadow">

            <h3 className="font-bold text-lg">{note.title}</h3>
            <p className="mb-3">{note.content}</p>

            <div className="flex gap-2 mt-2">

              <button onClick={() => deleteNote(note._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete</button>

              <button
                onClick={() => {
                  setEditingId(note._id);
                  setEditingTitle(note.title);
                  setEditingContent(note.content);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;