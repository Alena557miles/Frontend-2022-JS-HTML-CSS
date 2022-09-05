/* eslint-disable no-underscore-dangle */
const Note = require('../models/Note');

async function getNotes(req, res) {
  try {
    const userId = req.user._id;
    const notes = await Note.find({ userId });
    const offset = req.body.offset ? req.body.offset : 0;
    const limit = req.body.limit ? req.body.limit : 0;

    if (offset > 0 && offset < notes.length) {
      notes.splice(0, offset);
    }
    if (limit > 0 && limit < notes.length) {
      notes.splice(limit);
    }
    res.status(200).json({
      offset, limit, count: notes.length, notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteNoteById(req, res) {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({ message: 'No id specified' });
    }
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res.status(400).json({ message: 'no such note' });
    }
    await Note.findByIdAndDelete({ _id: noteId });
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getNoteById(req, res) {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    if (!noteId) {
      return res.status(400).json({ message: 'No id specified' });
    }
    const note = await Note.findOne({ userId, _id: noteId });
    return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function postNote(req, res) {
  const { completed, text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "'text' field required" });
  }
  const userId = req.user._id;
  const note = new Note({
    userId,
    completed,
    text,
  });

  try {
    const newNote = await note.save();
    if (!newNote) {
      return res.status(500).json({ message: 'Failed saving to db' });
    }
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function updateNoteById(req, res) {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "'text' field required" });
    }
    const noteId = req.params.id;

    if (!noteId) {
      return res.status(400).json({ message: 'No id specified' });
    }

    await Note.findByIdAndUpdate(noteId, { text });
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function toggleNoteCheck(req, res) {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({ message: 'No id specified' });
    }
    const note = await Note.findOne({ _id: noteId });
    const isCompleted = !note.completed;
    await Note.findByIdAndUpdate(noteId, { completed: isCompleted });
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getNotes,
  postNote,
  getNoteById,
  updateNoteById,
  toggleNoteCheck,
  deleteNoteById,
};
