function vec(x,y,z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}
vec.prototype = {
	add: function(v)
	{
		if(v instanceof vec)
		{
			return new vec(this.x + v.x, this.y + v.y, this.z + v.z);
		}else{
			return new vec(this.x + v, this.y + v, this.z + v);
		}
	},
	subtract: function(v)
	{
		if(v instanceof vec)
		{
			return new vec(this.x - v.x, this.y - v.y, this.z - v.z);
		}else{
			return new vec(this.x - v, this.y - v, this.z - v);
		}
	},
	multiply: function(v)
	{
		if(v instanceof vec)
		{
			return new vec(this.x * v.x, this.y * v.y, this.z * v.z);
		}else{
			return new vec(this.x * v, this.y * v, this.z * v);
		}
	},
	divide: function(v)
	{
		if(v instanceof vec)
		{
			return new vec(this.x / v.x, this.y / v.y, this.z / v.z);
		}else{
			return new vec(this.x / v, this.y / v, this.z / v);
		}
	},
	negative: function()
	{
		return new vec(-this.x,-this.y,-this.z);
	},
	dot: function(v)
	{
		return (this.x*v.x + this.y*v.y + this.z*v.z);
	},
	length: function()
	{
		return Math.sqrt(this.dot(this));
	},
	equals: function(v)
	{
		return this.x == v.x && this.y == v.y && this.z == v.z;
	},
	setLength: function(length)
	{
		return this.divide(this.length()).multiply(length);
	},
	unit: function()
	{
		return this.setLength(1);
	}
}