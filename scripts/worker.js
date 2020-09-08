importScripts("scripts/traviz.js");
onmessage = function (e) {
    console.log("start");
    var traviz = e.data[0];
    var files = e.data[1];
    traviz.prototype = TRAViz.prototype;
    traviz.align(files);
    postMessage(traviz);
}