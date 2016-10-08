//objects created
/*
var Rod = function(length,thickness, canvas,origin=[0,0]){
    this.ctx = canvas.getContext('2d');
    this.length=length;
    this.thickness=thickness;
    this.origin=origin;//origin is at left
    this.right=[origin[0]+length,origin[1]];
    };
  Rod.prototype.rotate = function(angle = 0,imagePoint,drawCircumference = true){
    this.ctx.lineWidth = this.thickness*ratio;
    this.ctx.translate(this.origin[0]+imagePoint[0], this.origin[1]+imagePoint[1]);
    this.ctx.rotate(convertToRadian(angle));
    this.ctx.beginPath();
    //this.ctx.moveTo(0,0);
    this.ctx.moveTo(-imagePoint[0],-imagePoint[1]);
    this.ctx.lineTo((this.length-imagePoint[0])*ratio,0);
    this.ctx.stroke();
    this.ctx.closePath();
    if(drawCircumference == true){
      this.ctx.beginPath();
      this.ctx.arc(0,0,this.length*ratio, 0, 2*Math.PI, false);
      this.ctx.lineWidth = this.thickness/2;
      this.ctx.stroke();
      this.ctx.closePath();
    }

    this.right=[this.origin[0]+imagePoint[0]+ratio*(this.length-imagePoint[0])*Math.cos (convertToRadian(angle)),this.origin[1]+ratio*(this.length-imagePoint[0])*Math.sin (convertToRadian(angle))];
    resetOrigin();
    };
Rod.prototype.attach = function(canvasPoint,imagePoint=[0,0]){
        //this.origin=point-imagePoint;
        this.origin =[canvasPoint[0] - imagePoint[0],canvasPoint[1]-imagePoint[1]];
    };
*/
var Slider = function(length,breadth,image,canvas, origin = [0,0]){
    this.ctx = canvas.getContext('2d');
    this.image=image;
    this.length=length;
    this.breadth=breadth;
    this.origin  = origin;
    this.left = [this.origin[0]-this.length/2,this.origin[1]];
    this.right = [this.origin[0]+this.length/2,this.origin[1]];
    this.top=[this.origin[0],this.origin[1]-this.breadth/2];
    this.bottom=[this.origin[0],this.origin[1]+this.breadth/2];
    this.imagePoint=[];
    this.firstLoop=1;
    };
Slider.prototype.attach = function(canvasPoint,imagePoint = [0,0]){
        //this.origin=canvasPoint;
        this.origin = [canvasPoint[0]- imagePoint[0],canvasPoint[1]-imagePoint[1]];
    };

Slider.prototype.rotate = function(angle,imagePoint=[0,0]){//imagePoint is the point of rotation
    //finds the value of origin after considering the angle
    this.origin = [this.origin[0] + imagePoint[0]-imagePoint[0]*Math.cos(convertToRadian(angle)),this.origin[1]+imagePoint[1]-imagePoint[0]*Math.sin(convertToRadian(angle))];
    this.ctx.translate(this.origin[0],this.origin[1]);
    this.ctx.rotate(convertToRadian(angle));
    this.ctx.drawImage(this.image,-this.length/2,-this.breadth/2,this.length,this.breadth);

    this.right=[this.origin[0]+ratio*(this.length/2)*Math.cos (convertToRadian(angle)),this.origin[1]+ratio*(this.length/2)*Math.sin (convertToRadian(angle))];
    this.left=[this.origin[0]-ratio*(this.length/2)*Math.cos (convertToRadian(angle)),this.origin[1]-ratio*(this.length/2)*Math.sin (convertToRadian(angle))];
    resetOrigin();
    };

Slider.prototype.addi = function(point=[0,0]){
        if(this.firstLoop==1){
            this.imagePoint.pop();
            this.imagePoint.push(point);
            this.firstLoop=0;
        }
};
//common variables and simple functions
var angle = 0.0;
var fps=60;
    var aspectRatio=16/9;
    var updateTextfromSlider=1; //controls how slider and text box gets updated
    var updateAngle=1; //controls whether angle is incremented
    //var firstLoop=1;//stores whether current loop is the very first loop
    //unable to create ratio var in js file


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
        return Math.asin((crank.length * Math.sin(convertToRadian(360 - angle)))/ (connectingRod.length))
    }
    function sliderPositionFromCrank(angle){
        return Math.sqrt(Math.pow(connectingRod.length,2) - Math.pow(crank.length*Math.sin(convertToRadian(360 - angle)),2)) + crank.length*Math.cos(convertToRadian(360 - angle))
    }
    function resetOrigin(){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    //starts updating text box values from slider
        function f1(){
        	updateTextfromSlider=1;//f==update
        }
    //stops updating text box from slider
        function f2(){
        	updateTextfromSlider=0;
        }
    //stops incrementing the value of angle
        function stop(){
          updateAngle=0;//flag updateAngle
          angle=360-parseFloat(setAngle.value)%360;
          omega2Slider.value=0;
        }
    //gets slider value from text box
        function set1(){
          crankSlider.value=crankLengthText.value;
          connectingRodSlider.value=connectingRodText.value;
          omega2Slider.value=omega2Text.value;
          updateTextfromSlider=1;
        }
