importScripts("travizalign.js");
onmessage = function (e) {
    console.log("start");
    let data = e.data[0];
    let traviz = new TRAViz("", data.config);

    traviz.align(data.files);
    var paths = this.aligner.getPathsByEdition(this.sentencePathHash[this.mainBranch], this.sentencePaths);
    postMessage([{
        "traviz": traviz,
        "config": data.config,
        "paths": paths
    }]);
}
