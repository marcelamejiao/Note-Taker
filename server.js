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

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Serve the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Default route
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/api/notes', (req, res) => {
        //get notes
        //load the db
        loadDb();

        let id = 1;
        const notes = state.map(function(note) {
            note.id = id;
            id++;
            return note;
        });

        //send the notes in the response
        res.json(notes);
    }
);

app.post('/api/notes', (req, res) => {
    // -- create and save the notes
    //load db 
    loadDb();

    //add a new note
    // Check if there is anything in the request body
    if (req.body) {
        const note = req.body;
        state.push(note);
        saveDb();

        res.json(`Note has been added!`);
    } else {
        res.json('Please fill in the note correctly.');
    }

    //save the note
    res.send("POST Request Called")
});

app.delete('/api/notes/:id', (req, res) =>
//delete notes
    res.send("DELETE Request Called")
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
