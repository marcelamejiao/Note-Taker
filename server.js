const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

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

app.get('/api/notes', (req, res) => {
        //get notes
        //load the db
        loadDb();

        //send the notes in the response
        res.json(state);
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
        
        // Assign an id to notes 
        note.id = uuidv4();
        
        state.push(note);
        saveDb();

        res.json(note);
    } else {
        res.json('Please fill in the note correctly.');
    }
});

app.delete('/api/notes/:id', (req, res) => {
//delete notes
    loadDb();

    const id = req.params.id;
    
    state = state.filter(function (note) {
        // If the ID matches the current note, 
        // do not include it in the new state.
        if (id !== note.id) {
            return true;
        } else {
            return false;
        }
    });

    saveDb();

    res.send("DELETE Request Called")
});

// Default route
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
