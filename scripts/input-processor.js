var worker = new Worker("scripts/worker.js");
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
                var waiting = true;
                reader.onload = function (event) {
                    files[files.length - 1].text = event.target.result;
                    waiting = false;
                };
                reader.readAsText(file);
                while (waiting) { }
            }
        }
    }
    var traviz = new TRAViz('divTravizContainer', config);
    traviz.align(files);
    traviz.visualize();
    traviz.graph.printVertices();

}