importScripts("travizalign.js");
onmessage = function (e) {
    console.log("start");
    let data = e.data[0];
    let traviz = new TRAViz("", data.config);

    traviz.align(data.files);
    var paths = traviz.aligner.getPathsByEdition(
        traviz.sentencePathHash[traviz.mainBranch],
        traviz.sentencePaths
    );
    postMessage([{
        "traviz": traviz,
        "config": data.config,
        "paths": paths
    }]);
}
