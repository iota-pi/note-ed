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

function printNetworks (ips, append) {
  let portStr = (port !== 80) ? ':' + port : '';

  append = append || ''
  for (let i = 0; i < ips.length; i++) {
    let label = '  Network: ';
    if (ips[i].local) {
      label = '  Local:   ';
    }
    console.log(label + ips[i].ip + portStr + '/' + append);
  }
  console.log('  Local:   ' + 'localhost' + portStr + '/' + append);
}

server.listen(port, function () {
  let interfaces = os.networkInterfaces();
  let ips = Object.keys(interfaces).map(name => {
    return interfaces[name].filter(x => x.family === 'IPv4')[0];
  }).map(x => ({ ip: x.address, local: x.internal }));
  ips.sort((a, b) => a.local - b.local);

  console.log('Server started, you can access it at:');
  printNetworks(ips);

  console.log('\nFor display mode:');
  printNetworks(ips, '?display=1');
});
