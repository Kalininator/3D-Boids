function swarm()
{
	this.boids = [];
	this.target = null;
}
swarm.prototype = {
	getMeshes: function()
	{
		var meshes = [];
		for(i = 0; i < this.boids.length; i ++)
		{
			meshes[i] = this.boids[i].mesh;
		}
		return meshes;
	},
	addBoid: function(boid)
	{
		this.boids[this.boids.length] = boid;
	},
	update: function()
	{
		for (var i = 0; i < this.boids.length; i ++)
		{
			this.boids[i].update();
		}
	},
	getBoidsInSight: function(boid)
	{
		var output = [];
		for(var i = 0; i < this.boids.length; i ++)
		{
			if(boid.canSee(this.boids[i]) && (!boid.equals(this.boids[i])))
			{
				output[output.length] = this.boids[i];
			}
		}
		return output;
	}
}
