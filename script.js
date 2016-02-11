var scene,camera,renderer,cubes,controls,swarm,boids;
var c,ctx;
var FOV = 90;
var MIN_DISTANCE = 0.5;
var VIEW_DISTANCE = 2;
var MAX_SPEED = 0.1;
var BOX_SIZE = 20;
$(function(){
	
	$("#bottom").width = window.innerWidth;
	$("#bottom").height = 200;
	$("#main").width = window.innerWidth;
	$("#main").height = window.innerHeight - 200;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(FOV,window.innerWidth/(window.innerHeight - 200), 0.1,1000); //fov , aspect ratio , near clipping plane, far clipping plane
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight - 200);
	$("#main").append( renderer.domElement );
	console.log(vec);
	controls = new THREE.OrbitControls( camera );
	
	swarm = new swarm();
	for(var i = 0; i < 100; i ++)
	{
		swarm.addBoid(new boid(new vec((Math.random()*10)-5,(Math.random()*10)-5,(Math.random()*10)-5),new vec(getRandom(-1,1),getRandom(-1,1),getRandom(-1,1)), swarm));
	}
	
	cubes = new THREE.Group();
	cubes.add(new box(new vec(-(BOX_SIZE/2),-(BOX_SIZE/2),-(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	cubes.add(new box(new vec(-(BOX_SIZE/2),(BOX_SIZE/2),-(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	cubes.add(new box(new vec((BOX_SIZE/2),-(BOX_SIZE/2),-(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	cubes.add(new box(new vec((BOX_SIZE/2),(BOX_SIZE/2),-(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	cubes.add(new box(new vec(-(BOX_SIZE/2),-(BOX_SIZE/2),(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	cubes.add(new box(new vec(-(BOX_SIZE/2),(BOX_SIZE/2),(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	cubes.add(new box(new vec((BOX_SIZE/2),-(BOX_SIZE/2),(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	cubes.add(new box(new vec((BOX_SIZE/2),(BOX_SIZE/2),(BOX_SIZE/2)),new vec(0.2,0.2,0.2),0x00ffff).mesh);
	scene.add( cubes );

	for(i = 0; i < swarm.boids.length; i ++)
	{
		scene.add(swarm.boids[i].mesh);
	}
	
	camera.position.z = BOX_SIZE * 1.5;
	render();
});

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function render() {
	requestAnimationFrame( render );
	
	
	controls.update();
	
	renderer.render( scene, camera );
	
	//finished drawing
	swarm.update();
}

function getObstacles(boid)
{
	var out = {boids: []};
	
	for(var i = 0; i < swarm.boids.length; i ++)
	{
		if(swarm.boids[i] != boid && swarm.boids[i].canSee(boid))
		{
			out.boids.push(swarm.boids[i].position);
		}
	}
	return out;
}

function box(pos,size,color)
{
	this.pos = pos;
	this.size = size;
	this.geometry = new THREE.BoxGeometry(size.x,size.y,size.z);
	this.material = new THREE.MeshBasicMaterial({color: color});
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	this.updatePos();
}
box.prototype = 
{
	updatePos: function()
	{
		this.mesh.position.x = this.pos.x;
		this.mesh.position.y = this.pos.y;
		this.mesh.position.z = this.pos.z;
	}
};