# Weather Browser Extension
A browser extension for displaying weather forecast based on your location. It works only on Chrome, Firefox and Opera.

# Quick Test
On Google Chrome:
- Open from menu settings -> extensions
- Drag **output/chrome/weather.crx** file on the browser
- Then, click **Add extension**

On Mozilla Firefox:
- Open "about:debugging" in Firefox
- click **Load Temporary Add-on**
- Select **output/firefox/weather.zip** file

# Installation
First, install [Node.js](https://nodejs.org/)

Then install **bower**
```sh
$ npm install bower
```
and **grunt-cli**
```sh
$ npm install grunt-cli
```

# Build
You are going to build project using grant-cli and the build outut will be
in **dist/** directory
```sh
$ grunt build
```
Now, **dist/** directory contains extension files. You can load extension files without packaging them and test extension on browser.
- Chrome: [Load Extension on Chrome Guide](https://developer.chrome.com/extensions/getstarted#unpacked)
- Firefox: [Temporary Installation in Firefox Guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
- Opera: [Testing and Debugging Guide](https://dev.opera.com/extensions/testing/)
