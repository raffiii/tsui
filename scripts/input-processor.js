var blob = new Blob([
    "onmessage = function (e) {"
    + "console.log('start');"
    + "var traviz = e.data[0];"
    + "var files = e.data[1];"
    + "traviz.align(files);"
    + "postMessage(traviz);"
    + "};"]);

// Obtain a blob URL reference to our worker 'file'.
var blobURL = window.URL.createObjectURL(blob);

var worker = new Worker(blobURL);
function genTraviz() {
    var config = {
        normalize: document.getElementById("normalize").checked,
        lineBreaks: document.getElementById("linebreaks").checked,
        rtl: document.getElementById("rtl").checked,
        startAndEnd: document.getElementById("startAndEnd").checked,
    };
    var x = document.getElementById("files");
    var files = [];
    if ('files' in x) {
        if (x.files.length == 0) {
            alert("Select one or more files.");
        } else {
            for (var i = 0; i < x.files.length; i++) {
                var file = x.files[i];
                files.push({});
                files[files.length - 1].edition = 'name' in file ? file.name : "No" + i;
                var reader = new FileReader();
                reader.onload = function (event) {
                    files[files.length - 1].text = event.target.result;
                };
                reader.readAsText(file);
                while (!'text' in files[files.length - 1]) { }
            }
        }
    }
    var traviz = new TRAViz('divTravizContainer', config);
    if (files.length >= 2) {
        worker.postMessage([traviz, files]);
    }
    worker.onmessage = function (e) {
        var traviz = e.data[0]
        traviz.visualize();
        traviz.graph.printVertices();
    }

}