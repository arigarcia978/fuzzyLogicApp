function Triangular(a, b, c) {
	this.a = a;
	this.b = b;
	this.c = c;
}

Triangular.prototype.calculateIntersection = function(value){
	var result = 0, x = value;
	if (x <= this.a) {
        result = 0;
    } else if (x >= this.c) {
        result = 0;
    } else if ((x > this.a) && (x <= this.b)) {
        result = (x - this.a) / (this.b - this.a);
    } else if ((x > this.b) && (x < this.c)) {
        result = (this.c - x) / (this.c - this.b);
    }
    return result;
}

function Trapezoide(a, b, c, d){
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
}

Trapezoide.prototype.calculateIntersection = function(value) {
	var result = 0, x = value;

    if (x < this.a) {
        result = 0;
    } else if (x > this.d) {
        result = 0;
    } else if ((x >= this.b) && (x <= this.c)) {
        result = 1;
    } else if ((x >= this.a) && (x < this.b)) {
        result = (x / (this.b - this.a)) - (this.a / (this.b - this.a));
    } else {
        result = (-x / (this.d - this.c)) + (this.d / (this.d - this.c));
    }
    return result;
}