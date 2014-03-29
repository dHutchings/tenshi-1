/* jshint globalstrict: true */
"use strict";

importScripts("resource://gre/modules/workers/require.js");
let serport = require('chrome://angel-player/content/common/serport_linux');

serport.init();
let port = null;
let serportObj = null;
let readerWorker = null;

function readerWorkerPassthrough(e) {
    postMessage(e.data);
}

// onmessage is magically called when a message is sent to this worker.
onmessage = function(e) {
    if (e.data.cmd === "open") {
        port = e.data.data;
        serportObj = serport.SerialPortOpen(port, 57600, 0);
        readerWorker = new ChromeWorker('serportReaderWorker.js');
        readerWorker.onmessage = readerWorkerPassthrough;
        readerWorker.postMessage(
            {timeout: serportObj.timeout,
             fd: serportObj.fd});
    } else if (e.data.cmd === "write") {
        serportObj.write(e.data.data);
    } else if (e.data.cmd === "close") {
        readerWorker.terminate();
        serportObj.close();
        close();
    }
};