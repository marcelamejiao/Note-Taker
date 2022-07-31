const express = require('express');
const path = require('path');

const fs = require('fs');

const app = express();
const PORT = 3001;

let state = [];

function saveDb() {
    const json = JSON.stringify(state);
    fs.writeFileSync('./db/db.json', json);
    
}

function loadDb() {
    const json = fs.readFileSync('./db/db.json', 'utf8');

    if (json !== null) {
        state = JSON.parse(json);
    }
}



app.use(express.static('public'));

// Default route
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/api/notes', (req, res) => {
        //get notes
        //load the db
        loadDb();
        //send the notes in the response
        res.send(state)
    }
);

app.post('/api/notes', (req, res) =>
//create and save the notes
    res.send("POST Request Called")
);

app.delete('/api/notes/:id', (req, res) =>
//delete notes
    res.send("DELETE Request Called")
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
