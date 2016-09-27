var Rod = function(length,thickness, canvas, origin = [0,0]){
  this.ctx = canvas.getContext('2d');
  this.length=length;
  this.thickness=thickness;
  this.origin = origin;
};
Rod.prototype.rotate = function(angle = 0, drawCircumference = true){
  this.ctx.lineWidth = this.thickness*ratio;
    this.ctx.translate(this.origin[0], this.origin[1]);
    this.ctx.rotate(convertToRadian(angle));
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(this.length*ratio,0);
    this.ctx.stroke();
    this.ctx.closePath();
    if(drawCircumference == true){
      this.ctx.beginPath();
      this.ctx.arc(0,0,this.length*ratio, 0, 2*Math.PI, false);
      this.ctx.lineWidth = this.thickness/2;
      this.ctx.stroke();
      this.ctx.closePath();
    }
    resetOrigin();
};
Rod.prototype.attach = function(point = [0,0]){
  this.origin = point;
};
var Slider = function(length,breadth, canvas, origin = [0,0],rot=[0,0]){
  this.ctx = canvas.getContext('2d');
  this.length=length;
  this.breadth=breadth;
  this.origin = origin;
  this.rot=rot;
};
Slider.prototype.attach = function(point = [0,0],rot){
  this.origin = point;
  this.rot=rot;
};
Slider.prototype.rotate = function(angle = 0){
    this.ctx.translate(this.rot[0], this.rot[1]);
    this.ctx.rotate(convertToRadian(angle));
    resetOrigin();
    this.ctx.translate(this.origin[0],this.origin[1]);
    this.ctx.strokeRect(0, 0, this.length*ratio, this.breadth*ratio);
    resetOrigin();
};
