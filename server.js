const port = 3000;
let express = require('express')
let app = express();
let server = require('http').Server(app);
let sock = require('socket.io')(server);

app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile('index.html');
});

let lastnotes = [];
sock.on('connection', function (client) {
  client.send({ notes: lastnotes });
  client.on('message', function (data) {
    if (data.hasOwnProperty('notes')) {
      client.broadcast.send({ notes: data.notes });
      lastnotes = data.notes;
    }
  });
});

server.listen(port, function () {
  console.log('Server started, listening on port ' + port)
});
