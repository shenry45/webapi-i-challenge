// implement your API here
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

// adds new user
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  db.insert(userInfo)
    .then(resp => {
      if (userInfo.name && userInfo.bio && resp.id) {
        res.status(201).json({ success: true, resp });
      } else {
        res.status(400).json({ success: false, errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err, error: "There was an error while saving the user to the database" });
    });
});

// retreives users list
server.get('/api/users', (req, res) => {
  db.find()
    .then(resp => {
      res.status(200).json({ success: true, resp });
    })
    .catch(err => {
      res.status(500).json({ success: false, error: "The users information could not be retrieved." });
    });
});

// finds user by ID
server.get('/api/users/:id', (req, res) => {
  // const userInfo = req.body;
  const {id} = req.params;
  
  db.findById(id)
    .then(resp => {
      if (resp) {
        res.status(200).json({ success: true, resp });
      } else {
        res.status(404).json({ success: false, message: "The user with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err, error: "The user information could not be retrieved." });
    });
});

// remove user
server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
    .then(resp => {
      if (resp) {
        res.status(200).json({ success: true, resp });
      } else {
        res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err, error: "The user could not be removed" });
    });
});


server.put('/api/users/:id', (req, res) => {
  const userInfo = req.body;

  const {id} = req.params;

  db.update(id, userInfo)
    .then(resp => {
      if (userInfo.name && userInfo.bio && resp === 1) {
        res.status(200).json({ success: true, resp });
      } else if (resp === 0) {
        res.status(404).json({ success: false, message: "The user with the specified ID does not exist." })
      } else {
        res.status(400).json({ success: false, errorMessage: "Please provide name and bio for the user." })
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err, error: "The user information could not be modified." })
    });
});

// LISTENER
server.listen(4000, () => {
  console.log('Listening on port 4000...');
})