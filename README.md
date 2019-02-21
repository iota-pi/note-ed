# NoteEd — Live Note Taking
NoteEd is a simple way to take notes on one computer and be able to broadcast them to multiple other devices in real-time, line-by-line. When used in conjunction with Open Broadcasting Software (OBS), a huge range of possibilities open up, including advanced compositing, and integration with other presentation tools such as Powerpoint.

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
3. Install the required packages by typing `npm i` in the same directory you cloned the repository to
4. Run the server: `node server.js`, this will also tell you how to access the app locally or over a network

### Local Setup
1. Follow the above general instructions on your computer
2. In your preferred browser, navigate to one of the locations indicated by the server
3. In OBS create a new 'Browser' source (Windows/Mac only), set the URL to one of the `Display Mode` URLs (i.e. add `?display=1` at the end)

### Network Setup
It may often be useful to have a multi-computer set up. The notes can be typed on one computer and screen-captured on another.
1. Ensure all computers are on the same local network
2. Follow the above general instructions on one computer
3. On the OBS computer create a new 'Browser' source (Windows/Mac only)
4. On both computers navigate to the network address provided by the server
5. On the OBS computer, use the `Display Mode` URL (i.e. add `?display=1` to the end)

### Usage Instructions
* Typing notes on one computer should now synchronise them on the other computer
* To quickly reset all notes, kill the server by going to the terminal window it is running from and press `Ctrl-C` and then run it again with `node server.js`

## Common Issues
* Make sure that your firewall and router are not blocking the port you are running on. To change the running port, edit line 1 of `server.js`
* Make sure that nothing else is using the same port on your computer

## Capturing a Browser Window in OBS
* On Windows and MacOS, OBS has a dedicated 'Browser' source, which is useful. However, this runs without hardware acceleration, which could make the animations seem a little laggy depending on your system.
* If you want hardware acceleration, or are running on Linux, you will need to capture an actual browser window
  * OBS cannot capture Google Chrome with the browser's hardware acceleration enabled.
  * Firefox tends to work well even with hardware acceleration enabled

## General OBS Tips
* If you have trouble with window/display capturing in OBS (including PowerPoint) try (all of) the following:
  * Run OBS as administrator
  * Run in Windows 7 Compatibility Mode
  * If running a Windows laptop with multiple GPUs (i.e. Nvidia Optimus), run OBS on the **integrated** GPU (the Windows display is drawn on this GPU)
* To improve framerate, image quality, and/or decrease latency, ensure that the window/display you are capturing is the right size for the output
  * Set your output display, OBS canvas resolutions (base and output), and the size of the window you are capturing to all be the same (e.g. 720p60)
* If the OBS projector is intermittently lagging, try setting OBS process priority to "High" in the OBS settings
* If image quality is poor, try changing the Downscale filter to "bicubic", the color space to "709", and color range to "partial"
