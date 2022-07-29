const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

// Default route
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/api/notes', (req, res) =>
    res.send("GET Request Called")
);

app.post('/api/notes', (req, res) =>
    res.send("POST Request Called")
);

app.delete('/api/notes/:id', (req, res) =>
    res.send("DELETE Request Called")
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
