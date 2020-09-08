importScripts("travizalign.js");
onmessage = function (e) {
    console.log("start");
    var traviz = new TRAViz("",{});
    var files = e.data[1];

    for (const [key, value] of Object.entries(e.data[0])){
        traviz[key] = value;
    }
    traviz.prototype = TRAViz.prototype;
    traviz.align(files);
    postMessage([traviz, e.data[2]]);
}