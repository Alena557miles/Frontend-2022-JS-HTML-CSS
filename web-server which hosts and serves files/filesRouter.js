const express = require('express');
const router = express.Router();
const { createFile, getFiles, getFile, editFile, deleteFile } = require('./filesService.js');

router.post('/', createFile);

router.get('/', getFiles);

router.get('/:filename', getFile);

// Other endpoints - put, delete.

router.put('/:filename', editFile);

router.delete('/:filename', deleteFile);

module.exports = {
  filesRouter: router
};
