var distance;
var length;
var confLocs = [];
var confTheta = [];
var camera;


function setup() {
    createCanvas(900, 800, WEBGL);

    //set the camera to point at centre of the screen
    camera = createCamera();
    camera.setPosition(800, -600, 800);
    camera.lookAt(0, 0, 0);

    //create confetti
    for(var i = 0; i < 200; i++)
    {
		//pushing 200 3D-vectors 
    	confLocs.push(createVector(random(-500, 500), random(-800, 0), random(-500, 500)));
    	confTheta.push(random(0, 360)); //pushing a random angle
    }
  
}

function draw() {
    background(125);
    angleMode(DEGREES);

    //calling all the different functions used
    drawBoxGrid();
    flyCamera();
    confetti();


    }

function drawBoxGrid()
{	
	//adding texture to distinguish the grid boxes
	normalMaterial();
	stroke(0);
	strokeWeight(2);

	//creating the grid of boxes
	for(var x = 0; x < 16; x++)
    {
    	for(var y = 0; y < 16; y++)
	    {	
			//calculating the distance from the centre of the coordinate system
	    	distance = dist(50* x - 400, 0, 50 * y - 400, 0, 0, 0)

			//adding some animation to the length of the grid boxes
	    	length = map(sin(distance+frameCount), -1, 1, 100, 300);

	    	push();
			var locX = (mouseX / width - 0.5) * 2;
            var locY = (mouseY / height - 0.5) * 2;
			//translating the grid 
	    	translate(50 * x - 400, 0, 50 * y - 400);

			//adding a different material such as light just to the cubes or boxes only 
			stroke(200, 200, 0);
			fill(0, 100, 100);
			directionalLight(0, 250, 250, -locX, -locY, 1)
	    	box(50, length, 50);
	    	pop();
	    }
    }
}

function flyCamera()
{
	//setting the camera to fly uninteruptedly, reseting after every 10 sec  
	camera.setPosition(sin(frameCount/10) * 800, -600, cos(frameCount/10) * 800);
	camera.lookAt(0, 0, 0);
}

function confetti()
{	
	noStroke();
	for(var i = 0; i < 200; i++)
    {

		//adding some animation to the confetti
    	push();
    	translate(confLocs[i]);
    	rotateX(confTheta[i]);
    	plane(15, 15);
		pop();

		confLocs[i].y += 1;
		confTheta[i] += 10;

		//check if confetti reached middle of the screen
		if (confLocs[i].y > 0)
		{
			confLocs[i].y = -800;
		}
    	
    }
}


