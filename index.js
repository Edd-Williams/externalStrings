const express = require('express')
const cors = require('cors');
const port = 4000

const app = express()
app.use(express.json());
app.use(cors())

const fs = require('fs');
const path = require('path');

const stringData = require('./strings.json'); 

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
  res.sendStatus(200);
  // res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/strings', (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(stringData));
})

app.post('/strings', (req, res) => {
  console.log(req.json);
  fs.writeFileSync(path.resolve(__dirname, "./strings.json"), JSON.stringify(req.body, null, "\t"));
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})