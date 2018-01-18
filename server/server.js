const express = require('express');
const config = require('./config');
const path = require('path');
const server = express();

server.use(express.static('public'));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
