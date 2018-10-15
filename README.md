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
It may often be useful to have a multi-computer set up. The notes can be typed on one computer and screen-captured on another. This requires a little more setup, as described below:

1. Ensure all computers are on the same local network
2. Install [`node.js`](https://nodejs.org/en/) on one computer
3. Open a terminal/command prompt window and navigate to the directory containing git repository
4. Install the required packages by typing `npm i` in the same directory you cloned the repository to 
5. Run the server: `node server.js`, this will also tell you which port the server is listening on, e.g. 3000
6. Find this computer's IP address: `ifconfig` (most unix systems) or `ipconfig` (Windows and some unix systems)
7. On each computer, navigate to `<ip>:<port>`, for example: `192.168.0.2:3000`
8. Typing notes on one computer should now synchronise them on the other computer
9. To quickly reset all notes, kill the server by going to the terminal window it is running from and press `Ctrl-C` and then run it again with `node server.js`

## Common Issues
* Make sure that your firewall and router are not blocking the port you are running on. To change the running port, edit line 1 of `server.js`
* Make sure that nothing else is using the same port on your computer, you can change the default port by editting `server.js`

## Notes on using in conjunction with OBS window/display capture
* OBS cannot capture Google Chrome with the browser's hardware acceleration enabled. Either disable hardware acceleration temporarily (likely to cause noticable lag) or use another browser, e.g. Firefox
* If you have trouble with window/display capturing in OBS (including PowerPoint) try (all of) the following:
  * Run OBS as administrator
  * Run in Windows 7 Compatability Mode
  * If running a Windows laptop with multiple GPUs (Nvidia Optimus), ensure that you are running OBS on the integrated GPU. This is because the Windows display is drawn on this GPU
* To improve framerate, image quality, and/or decrease latency, ensure that the window/display you are capturing is the right size for the output. E.g. set up your window, output display and OBS canvas resolutions to all be the same (e.g. 720p60)
* If the OBS projector is intermittently lagging, try setting OBS process priority to "High" in the OBS settings
* If image quality is poor, try changing the Downscale filter to "bicubic", the color space to "709", and color range to "partial"
