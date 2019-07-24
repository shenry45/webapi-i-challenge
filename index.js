// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  const {name} = req.params;
  console.log(name);

  db.insert(userInfo)
    .then(resp => {
      if (resp.id) {
        res.status(200).json({ success: true, resp });
      } else {
        res.status(400).json({ success: false, errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
server.get('/api/users', (req, res) => {

});
server.get('/api/users/:id', (req, res) => {

});
server.delete('/api/users/:id', (req, res) => {

});
server.put('/api/users/:id', (req, res) => {

});

// LISTENER
server.listen(4000, () => {
  console.log('Listening on port 4000...');
})