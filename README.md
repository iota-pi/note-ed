# NoteEd — Live Note Taking
NoteEd is a simple way to take notes on one computer and be able to broadcast them to multiple other devices in real-time, line-by-line. When used in conjunction with Open Broadcasting Software (OBS), a huge range of possibilities open up, including advanced compositing and integration with other presentation tools such as PowerPoint.

## Downloading/Cloning this Repository
On any machine which has `git` installed ([check here](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) for instructions on how to install `git`), open a terminal/command prompt window and enter the following commands

``` bash
cd /path/to/save/repository/at/
git clone git@github.com:iota-pi/live_notes.git
```

## Operation Instructions
### General Setup
1. Install [`node.js`](https://nodejs.org/en/)
2. Open a terminal/command prompt window and navigate to the directory containing git repository
3. Install the required packages by typing `npm install` in the same directory you cloned the repository to
4. Run the server: `node server.js`, this will also tell you how to access the app locally or over a network

### Local Setup
1. Follow the above general instructions on your computer
2. In your preferred browser, navigate to one of the locations indicated by the server
3. In OBS create a new 'Browser' source (Windows/Mac only), set the URL to one of the Display Mode URLs (i.e. add `?display=1` at the end)

### Network Setup
It may often be useful to have a multi-computer set up. The notes can be typed on one computer and screen-captured on another.
1. Ensure all computers are on the same local network
2. Follow the above general instructions on one computer
3. On the OBS computer create a new 'Browser' source (Windows/Mac only)
4. On both computers navigate to the network address provided by the server
5. On the OBS computer, use the Display Mode URL (i.e. add `?display=1` to the end)

### Usage Instructions
* Typing notes on one computer will now synchronise them on the other computer
* To quickly reset all notes, kill the server by going to the terminal window it is running from and press `Ctrl-C` and then run it again with `node server.js` (press the up arrow key to quickly duplicate your previous command)
* To set a password specify the `--password` option when running the server e.g. `node server.js --password verysecret`. See notes below about security
* To change the port the note server listens on, specify the command line option `-p` or `--port` e.g. `node server.js --port 8888`

## Common Issues
* Make sure that nothing else is using the same port on your computer
* Make sure that your firewall and router are not blocking the port you are running on

## Security
* Ideally, the network you run this on is not open to any untrusted devices
* Any device on the network is able to see the notes you broadcast
* Any device on the network is able to add notes if they have the correct password (or if you haven't set one)
* There is no protection against brute-force attacks on the password
* Passwords are sent in plain text across the network
* Notes are also sent unencrypted, so they could be intercepted and modified

**TLDR**: don't use this in a situation where a skilled and unscrupulous hacker has access to your network

## Capturing a Browser Window in OBS
* On Windows and MacOS, OBS has a dedicated 'Browser' source. Set the URL appropriately, remembering the `?display=1`
* If you are running on Linux, you may need to capture an actual browser window until OBS adds support for the browser source in the Linux build
  * OBS cannot capture Chromium/Google Chrome windows when the browser's hardware acceleration is enabled
  * Firefox tends to work well even with hardware acceleration enabled

## General OBS Tips
* To improve framerate, image quality, and/or decrease latency, ensure that the window/display you are capturing is the right size for the output
  * Set your output display, OBS canvas resolutions (base and output), and the size of the window you are capturing to all be the same (e.g. 720p60)
* If the OBS projector is intermittently lagging, try setting the process priority to "High" in the OBS settings
* If image quality is poor, try changing the downscale filter to "bicubic", the colour space to "709", and colour range to "partial"
