var worker = new Worker("scripts/worker.js");

worker.onmessage = e => {
    let config = e.data[1];
    let traviz = new TRAViz(config);
    $.extend(traviz,e.data[0]);
    traviz.visualize();
    traviz.graph.printVertices();

}
function readConfig(){
    return {
        normalize: document.getElementById("normalize").checked,
        lineBreaks: document.getElementById("linebreaks").checked,
        rtl: document.getElementById("rtl").checked,
        startAndEnd: document.getElementById("startAndEnd").checked,
    };
}

async function genTraviz() {
    var config = readConfig();
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
    worker.postMessage([traviz,files,config])

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