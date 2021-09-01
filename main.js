status = "";

var objects = [];

function preload(){
   cry = loadSound("baby-crying-05.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Baby : Detecting Baby";
}

function draw(){
    image(video ,0,0,380,380);
    console.log(status);
    
if(status != ""){
  for(i=0 ; i<objects.length ; i++){
    r = random(255);
    g = random(255);
    b = random(255);
    
    percent = floor(objects[i].confidence * 100);
    fill(r,g,b);
    stroke(r,g,b);
    text(objects[i].label  +" "+percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height);

    if(objects[i].label == "person"){
      document.getElementById("status").innerHTML = "Status : Baby Found";
    }
    else{
      document.getElementById("status").innerHTML = "Status : Baby Not Found";
      cry.play();
    }
  }
}
}

function modelLoaded(){
    console.log("CocoSsd is initialized");
    status = true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results){
   if(error){
      console.error(error);
}
   else{
       console.log(results);
       objects = results;
}
}