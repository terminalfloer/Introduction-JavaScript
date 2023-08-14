const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB-Verbindung herstellen
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Verbindung zur MongoDB-Datenbank hergestellt'))
  .catch(err => console.error('Fehler beim Verbinden zur MongoDB-Datenbank:', err));

// Benutzer-Schema definieren
const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  active: { type: Boolean, default: false }
});

// Benutzer-Modell erstellen
const User = mongoose.model('User', userSchema);

const app = express();
app.use(bodyParser.json());

// GET: Alle Benutzer abrufen
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: 'Interner Serverfehler' }));
});

// POST: Neuen Benutzer erstellen
app.post('/users', (req, res) => {
  const { id, username, active } = req.body;
  const newUser = new User({ id, username, active });

  newUser.save()
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({ message: 'Fehler beim Erstellen des Benutzers' }));
});

// GET: Einen bestimmten Benutzer abrufen
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  User.findOne({ id: userId })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Benutzer nicht gefunden' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Interner Serverfehler' }));
});

// PUT: Einen bestimmten Benutzer aktualisieren
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, active } = req.body;

  User.findOneAndUpdate({ id: userId }, { username, active }, { new: true })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Benutzer nicht gefunden' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Interner Serverfehler' }));
});

// DELETE: Einen bestimmten Benutzer löschen
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  User.findOneAndDelete({ id: userId })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(

404).json({ message: 'Benutzer nicht gefunden' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Interner Serverfehler' }));
});

app.listen(3000, () => {
  console.log('API-Server gestartet');
});
