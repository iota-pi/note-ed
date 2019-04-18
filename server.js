const express = require('express');
const app = express();
const server = require('http').Server(app);
const sock = require('socket.io')(server);
const os = require('os');
const args = require('minimist')(process.argv.slice(2));

// Get port from args or default to port 80
const port = args.p || args.port || 80;

// Get password from args (if provided)
const editPassword = args.password || null;

// Configure express server
app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile('index.html');
});

// Print network interfaces
function printNetworks (ips, append) {
  let portStr = (port !== 80) ? ':' + port : '';

  append = append ? ('/' + append) : ''
  for (let i = 0; i < ips.length; i++) {
    let label = '  Network: ';
    if (ips[i].local) {
      label = '  Local:   ';
    }
    console.log(label + ips[i].ip + portStr + append);
  }
  console.log('  Local:   ' + 'localhost' + portStr + append);
}

// Listen for web socket connections
let lastnotes = [];
sock.on('connection', (client) => {
  client.send({ notes: lastnotes, secured: editPassword !== null });

  client.on('authenticate', (data) => {
    if (data.password === editPassword || editPassword === null) {
      client.send({ auth: true });

      client.on('message', (data) => {
        if (data.hasOwnProperty('notes')) {
          client.broadcast.send({ notes: data.notes });
          lastnotes = data.notes;
        }
      });
    } else {
      client.send({ auth: false, error: 'Invalid password' });
    }
  });
});

// Start the HTTP server listening
server.on('error', function (error) {
  if (error.code === 'EACCES' || error.code === 'EADDRINUSE') {
    console.error('Could not listen on port ' + port);
    console.error('Check that the port is unused and try again');
    console.error('You can specify a different port with "-p [port]"');
  }
})

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
