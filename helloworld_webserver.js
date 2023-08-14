const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hallo Welt');
});

app.listen(3000, () => {
  console.log('Der Webserver ist auf Port 3000 gestartet!');
});
