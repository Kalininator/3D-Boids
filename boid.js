function boid(position,velocity,swarm)
{
	
	this.position = position;
	this.velocity = velocity;
	this.swarm = swarm;
	this.geometry = new THREE.BoxGeometry(0.2,0.2,0.2);
	this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	this.updatePos();
}
boid.prototype = {
	updatePos: function()
	{
		
		this.mesh.position.x = this.position.x;
		this.mesh.position.y = this.position.y;
		this.mesh.position.z = this.position.z;
		
		
	},
	equals: function(boid)
	{
		return this.position.equals(boid.position) && this.velocity.equals(boid.velocity);
	},
	update: function()
	{
		this.velocity = this.velocity.add(this.rule1());
		this.velocity = this.velocity.add(this.rule2());
		this.velocity = this.velocity.add(this.rule3());
		this.velocity = this.velocity.add(this.rule4());
		this.velocity = this.velocity.add(this.boundPosition());
		this.velocity = this.limitSpeed(MAX_SPEED);
		this.position = this.position.add(this.velocity);
		this.updatePos();
	},
	rule1: function() //move towards the center of mass
	{
		//get all boids in sight
		var insight = this.swarm.getBoidsInSight(this);
		
		if(insight.length == 0)
		{
			return new vec(0,0,0);
		}
		
		var cofm = new vec(0,0,0);
		for(var i = 0; i < insight.length; i ++)
		{
			cofm = cofm.add(insight[i].position);
		}
		cofm = cofm.divide(insight.length);
		return cofm.subtract(this.position).divide(500);
	},
	rule2: function()//avoid collisions
	{
		var v = new vec(0,0,0);
		var insight = getObstacles(this);
		
		if(insight.boids.length == 0)
		{
			return v;
		}
		for(var i = 0; i < insight.boids.length; i ++)
		{
			if(insight.boids[i].subtract(this.position).length() < MIN_DISTANCE)
			{
				v = v.subtract(insight.boids[i].subtract(this.position).divide(1));
			}
		}
		return v;
	},
	rule3: function()//aim towards the average velocity
	{
		var insight = this.swarm.getBoidsInSight(this);
		
		if(insight.length == 0)
		{
			return new vec(0,0,0);
		}
		var v = new vec(0,0,0);
		
		for(var i = 0; i < insight.length; i ++)
		{
			v = v.add(insight[i].velocity);
		}
		v = v.divide(insight.length);
		return v.subtract(this.velocity).divide(16);
	},
	rule4: function()//aim towards target if one exists
	{
		if(this.swarm.target != null)
		{
			var target = this.swarm.target;
			if(this.canSee(new boid(target,new vec(0,0,0))))
			{
				return target.subtract(this.position).divide(500);
			}else{
				return new vec(0,0,0);
			}
			
			
		}else{
			return new vec(0,0,0);
		}
	},
	boundPosition: function()
	{
		var xmin = -(BOX_SIZE/2);
		var xmax = (BOX_SIZE/2);
		var ymin = -(BOX_SIZE/2);
		var ymax = (BOX_SIZE/2);
		var zmin = -(BOX_SIZE/2);
		var zmax = (BOX_SIZE/2);
		var c = 0.5;
		var v = new vec(0,0,0);
		
		if(this.position.x < xmin)
		{
			v.x = c;
		}else if(this.position.x > xmax)
		{
			v.x = -c;
		}
		
		if(this.position.y < ymin)
		{
			v.y = c;
		}else if(this.position.y > ymax)
		{
			v.y = -c;
		}
		
		if(this.position.z < zmin)
		{
			v.z = c;
		}else if(this.position.z > zmax)
		{
			v.z = -c;
		}
		
		return v;
	},
	limitSpeed: function(max)
	{
		if(this.velocity.length() > max)
		{
			return this.velocity.setLength(max);
		}else{
			return this.velocity;
		}
	},
	canSee: function(boid)
	{
		var inRange = this.position.subtract(boid.position).length() < VIEW_DISTANCE;
		
		return inRange;
	}
}


