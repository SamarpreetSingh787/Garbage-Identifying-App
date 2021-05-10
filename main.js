glass_img = "";
plas_img = "";
paper_img = "";
metal_img = "";
orgn_img = "";
battery_img = "";
turn_rt = "true";

function preload() {
    glass_img = loadImage("gls.png");
    plas_img = loadImage("plas.png");
    paper_img = loadImage("paper.png");
    metal_img = loadImage("mtl.png");
    orgn_img = loadImage("orgn.png");
    battery_img = loadImage("btry.png");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(450, 350);

    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ceql4KwxZ/model.json', modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function draw() {
    image(video, 0, 0, 600, 500);
    classifier.classify(video, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
    if (results[0].confidence > 0.5) {
        console.log(results);
        document.getElementById("catg_n").innerHTML = results[0].label;
        document.getElementById("accu").innerHTML = results[0].confidence.toFixed(3);
        document.getElementById("msg_catg").innerHTML = "I am sure that it belongs to " + results[0].label;
        document.getElementById("msg_accu").innerHTML = "I have " + results[0].confidence.toFixed(3) + " confidence that this garbage belongs to " + results[0].label + " category";
    }
    else {
        console.log(results);
        document.getElementById("catg_n").innerHTML = results[0].label;
        document.getElementById("accu").innerHTML = results[0].confidence.toFixed(3);
        document.getElementById("msg_catg").innerHTML = "I think that it belongs to " + results[0].label;
        document.getElementById("msg_accu").innerHTML = "I have " + results[0].confidence.toFixed(3) + " confidence that this garbage belongs to " + results[0].label + " category";
    }
}
}