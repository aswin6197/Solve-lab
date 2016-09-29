var imported = document.createElement('functions');
imported.src = 'functions.js';
document.head.appendChild(imported);
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
var angle = 0.0;
var fps=60;
    var aspectRatio=16/9;
    var f=1; //controls how slider and text box gets updated
    var flag=1; //controls whether angle is incremented
    //var ratio=canvas.width/1280;


    function convertToRadian(degree){
        return degree*(Math.PI/180);
    }
    function convertToDegree(radian){
        return radian/(Math.PI/180);
    }
    function incrementAngle(){

      if(dirRev.checked==0){
        angle = angle + parseFloat(omega2Slider.value);
      }
      else {
        angle = angle - parseFloat(omega2Slider.value);
      }  //parseInt converts the string returned by omega2Slider.value to an int
      if(angle > 360){
        angle = angle - 360;
      }
      else if (angle<0) {
        angle = angle+360;
      }
    }
    function calculatePhi(angle){
        return Math.asin((crank.length * Math.sin(convertToRadian(360 - angle)))/ connectingRod.length)
    }
    function sliderPositionFromCrank(angle){
        return Math.sqrt(Math.pow(connectingRod.length,2) - Math.pow(crank.length*Math.sin(convertToRadian(360 - angle)),2)) + crank.length*Math.cos(convertToRadian(360 - angle))
    }
    function resetOrigin(){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    //starts updating text box values from slider
        function f1(){
        	f=1;
        }
    //stops updating text box from slider
        function f2(){
        	f=0;
        }
    //stops incrementing the value of angle
        function stop(){
          flag=0;
          angle=360-parseFloat(setAngle.value)%360;
          omega2Slider.value=0;
        }
    //gets slider value from text box
        function set1(){
          crankSlider.value=crankLengthText.value;
          connectingRodSlider.value=connectingRodText.value;
          omega2Slider.value=omega2Text.value;
          f=1;
        }
