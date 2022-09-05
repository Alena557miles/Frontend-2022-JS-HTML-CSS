const express = require('express');

const router = express.Router();

const {
  getNotes, postNote, getNoteById, updateNoteById, toggleNoteCheck, deleteNoteById,
} = require('../controllers/notesController');

router.get('/', getNotes);

router.post('/', postNote);

router.get('/:id', getNoteById);

router.delete('/:id', deleteNoteById);

router.put('/:id', updateNoteById);

router.patch('/:id', toggleNoteCheck);

module.exports = router;
