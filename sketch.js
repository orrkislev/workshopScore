function preload() {
    logos = loadImage('logos.jpg');
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    noLoop()
    noStroke()
    rectMode(CENTER)
    imageMode(CENTER)

    logos.resize(0.8*width/2,0)
}

function draw(){
}

function updateP5(){
    background(0)
    fill(255)
    rect(width/2,height/2,width/2,height*0.75,20)

    image(logos,width/2,height*0.2)

    x = 3*width/9;
    for (device in allData){
        deviceData = allData[device]
        fill(0)
        text(deviceData.name,x,height*0.85)
        y = height*0.75
        steps = 12
        yStep = height*(0.75-0.3)/12 
        for (i=0;i<12;i++){
            if (i<deviceData.score){
                fill(250,30,50)
            } else {
                fill(200,200,200)
            }
            rect(x,y,width/9-20,yStep-2)
            y-=yStep;
        }
        x+=width/9;
    }
}