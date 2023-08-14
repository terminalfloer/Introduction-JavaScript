const express = require('express');
const app = express();

let users = [];

// GET: Alle Benutzer abrufen
app.get('/users', (req, res) => {
  res.json(users);
});

// POST: Neuen Benutzer erstellen
app.post('/users', (req, res) => {
  const { id, username, active } = req.body;
  const newUser = { id, username, active };
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET: Einen bestimmten Benutzer abrufen
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Benutzer nicht gefunden' });
  }
});

// PUT: Einen bestimmten Benutzer aktualisieren
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, active } = req.body;
  const user = users.find(u => u.id === userId);
  if (user) {
    user.username = username || user.username;
    user.active = active || user.active;
    res.json(user);
  } else {
    res.status(404).json({ message: 'Benutzer nicht gefunden' });
  }
});

// DELETE: Einen bestimmten Benutzer löschen
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'Benutzer nicht gefunden' });
  }
});

app.listen(3000, () => {
  console.log('API-Server gestartet');
});
