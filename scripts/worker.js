importScripts("travizalign.js");
onmessage = function (e) {
    console.log("start");
    let data = e.data[0];
    let traviz = new TRAViz("", data.config);
    let files = data.files;

    let entries = Object.getOwnPropertyNames(e.data[0]);
    const index = entries.indexOf("config");
    if (index > -1) {
        entries.splice(index, 1);
    }
    for (const [key, value] of entries) {
        traviz[key] = value;
    }
    traviz.prototype = TRAViz.prototype;
    traviz.align(files);
    var paths = this.aligner.getPathsByEdition(this.sentencePathHash[this.mainBranch], this.sentencePaths);
    postMessage([{
        "traviz": traviz,
        "config": data.config,
        "paths": paths
    }]);
}