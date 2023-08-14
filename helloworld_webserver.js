const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hallo Welt');
});

app.get('/hello/:myName', (req, res) => {
  const name = req.params.myName;
  res.send(`Hallo ${name}`);
});

app.listen(3000, () => {
  console.log('Der Webserver ist auf Port 3000 gestartet!');
});
