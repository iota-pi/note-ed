# Live Notes
## Downloading/Cloning this Repository
On any machine which has `git` installed ([check here](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) for instructions on how to install `git`), open a terminal/command prompt window and enter the following commands

``` bash
cd /path/to/save/repository/at/
git clone git@github.com:iota-pi/live_notes.git
```

## Operation instructions
### Single screen
This can be used simply on a single computer by simply opening the file in your browser. Type notes in the box at the top and submit them by pressing enter.

### Multi-screen
It may often be useful to have a multi-computer set up. For example, if using screen capture with OBS, the notes can be typed on one computer and screen captured on another computer. This requires a little more setup, as layed out below:

1. Ensure all computers are on the same local network
2. Install [`node.js`](https://nodejs.org/en/) on one computer
3. Open a terminal/command prompt window and navigate to directory containing git repository and run the note server like so: `node server.js`. This will start the server and tell you which port it is listening on, e.g. 3000
4. Find this computer's IP address: `ifconfig` (most unix systems) or `ipconfig` (Windows and some unix systems)
5. On each computer you wish to run the program, navigate to `<ip>:<port>`, e.g: `192.168.0.2:3000`
6. Typing notes on one computer should now synchronise them on the other computer
7. To quickly reset all notes, kill the server by going to the terminal window it is running from and press `Ctrl-C` and then run it again with `node server.js`
## Common Issues
* Make sure that your firewall and router are not blocking the port you are running on. To change the running port, edit line 1 of `server.js`
* Make sure that nothing else is using the same port on your computer, you can change the default port by editting `server.js`

## Notes on using in conjunction with OBS window capture
* OBS cannot capture Google Chrome windows with hardware acceleration enabled. Either disable hardware acceleration temporarily or use another browser, e.g. Firefox
* One other option is to install a second version of Chrome (e.g. Dev or Canary editions) and disable hardware acceleration. However, this will have a noticable performance impact.
