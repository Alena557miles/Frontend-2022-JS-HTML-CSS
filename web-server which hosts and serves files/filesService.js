const fs = require('fs');
const path = require('path');

const extensions = ['.log', '.txt', '.json', '.yaml', '.xml', '.js'];

function specifyParameter(param, res) {
  return res.status(400).json({ 'message': `Please specify ${param} parameter` })
}

function createFile (req, res, next) {
  if (!req.body.filename) return specifyParameter('filename', res);
  else if (!req.body.content) return specifyParameter('content', res);
  else if (!extensions.includes(path.extname(req.body.filename))) return specifyParameter('valid file extension', res);
  const filePath = path.join(__dirname, 'files', req.body.filename);
  if (fs.existsSync(filePath)) return res.status(400).json({ 'message': `File already exists` });
  fs.writeFileSync(filePath, req.body.content)
  res.status(200).send({ "message": "File created successfully" });
}

function getFiles (req, res, next) {
  const filePath = path.join(__dirname, 'files');
  const filesFromDir = fs.readdirSync(filePath);
  if (filesFromDir.length === 0 ) {
    return res.status(400).json({'message': 'Client error'})
  }
  res.status(200).send({
    "message": "Success",
    "files": filesFromDir});
}

const getFile = (req, res, next) => {
  const filePath = path.join(__dirname, 'files', req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({'message': `No file with '${req.params.filename}' filename found`})
  }
  const file = fs.readFileSync(filePath, {encoding:'utf8'})
  const uploadedDate = fs.statSync(filePath).mtime;
  res.status(200).send({
    "message": "Success",
    "filename": req.params.filename,
    "content": file ?? 'No content',
    "extension": path.extname(filePath).replace('.', '') ?? 'There is no extension for this file',
    "uploadedDate": uploadedDate ?? 'There is no uploaded date for this file'});
}

const editFile = (req, res, next) => {
  if (!req.body.content) return specifyParameter('content', res);
  const filePath = path.join(__dirname, 'files', req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ 'message': `No file with '${req.params.filename}' filename found` });
  }
  fs.writeFileSync(filePath, req.body.content)
  return res.status(200).json({ 'message': 'File updated successfully' });
}

const deleteFile = (req, res, next) => {
  const filePath = path.join(__dirname, 'files', req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ 'message': `No file with '${req.params.filename}' filename found` });
  }
  fs.unlinkSync(filePath)
  return res.status(200).json({ 'message': 'File deleted successfully' });
}

module.exports = {
  createFile,
  getFiles,
  getFile,
  editFile,
  deleteFile
}
