import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static(__dirname+'/public'));

sockets.on('connection',(socket) => {
    const playerId = socket.id;
    console.log(`player connected on server with id ${playerId}`);
});

app.get('/', function (req, res) {
    res.sendFile(path.join('/index.html'));
});

server.listen(3000, function () {
    console.log('\n Example app listening on port 3000!');
});
