const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, 'text_files');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
  const currentTimestamp = new Date().toISOString();
  const fileName = `${currentTimestamp.replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, currentTimestamp, (err) => {
    if (err) {
      return res.status(500).send('Error creating file');
    }
    res.send('File created successfully');
  });
});

// Endpoint to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading folder');
    }
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
