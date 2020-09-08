var worker = new Worker("scripts/worker.js");
async function genTraviz() {
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
                let file = x.files[i];
                files.push({});
                files[files.length - 1].edition = 'name' in file ? file.name : "No" + i;
                files[files.length - 1].text = await readFileAsync(file);
            }
        }
    }
    var traviz = new TRAViz('divTravizContainer', config);
    traviz.align(files);
    traviz.visualize();
    traviz.graph.printVertices();

}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    })
}