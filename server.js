const http = require('http');
const index = require('./index.js');

const port = process.env.PORT || 3000;

const server = http.createServer(index);

server.listen(port);
