importScripts("travizalign.js");
onmessage = function (e) {
    console.log("start");
    var traviz = new TRAViz("", new TRAVizConfig(e.data[2]));
    var files = e.data[1];
    traviz.align(files);
    postMessage([traviz, e.data[2]]);
}
