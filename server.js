const port = 8001;
let express = require('express');
let app = express();
let server = require('http').Server(app);
let sock = require('socket.io')(server);
let os = require('os');

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
  let interfaces = os.networkInterfaces().Ethernet;
  let ips = [];
  if (interfaces) {
    ips = interfaces.filter(x => x.family === 'IPv4').map(x => x.address);
  }
  let portStr = (port !== 80) ? ':' + port : ''

  console.log('Server started, you can access it at:');
  for (let i = 0; i < ips.length; i++) {
    console.log('  Network: ' + ips[i] + portStr + '/');
  }
  console.log('  Local:   ' + 'localhost' + portStr + '/');
});
