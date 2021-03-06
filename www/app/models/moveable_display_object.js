State = require('ampersand-state');
DisplayObject = require('./display_object');
math = require('../lib/math')
Position = require('./position');

MoveableDisplayObject = DisplayObject.extend({
  props:{
    speed:{
      type:'number',
      default: 1
    },
    inHit:{
      type:'boolean',
      default:false
    }
    
  },

  inContact:function(otherObject){
    if(otherObject.contact != undefined){
      return otherObject.contact(this.position)
    } else{
      return this.position.distanceTo(otherObject.position) < 15
    }
  },

  moveInDirection:function(){
    if(this.direction===null || this.direction === undefined){ return }
    var change = math.polarToCartesian(this.speed, this.direction );
    this.position.x = this.position.x + change.x;
    this.position.y = this.position.y - change.y;
  },

  setTargetPosition:function(position){
    this.position = position;
  },

  setDirectionFromTarget:function(){
    if(!this.target){return;}
    var diffX =  this.position.xDifference(this.target.position);
    var diffY =  -1 * this.position.yDifference(this.target.position);

    var absDiffX = Math.abs(diffX);
    var absDiffY = Math.abs(diffY);   
    
    var baseDirection = Math.atan(absDiffY/absDiffX);


    if(diffX >= 0){
      if(diffY >= 0){
        this.direction = baseDirection;  
      }else{
        
        this.direction = (2*Math.PI) - baseDirection;   
      }
    }
    else{
      if(diffY >= 0){      
        this.direction = Math.PI - baseDirection;
      }else{
        this.direction = Math.PI + baseDirection;        
      }
    }

  },


  // moveTowardsPosition:function(targetPosition){
  //   if(!targetPosition){return}
  //   var pixelsPerMove = this.speed * 5;
    
  //   var diffX = this.position.xDifference(targetPosition);
  //   var diffY = this.position.yDifference(targetPosition);

  //   var absDiffX = Math.abs(diffX);
  //   var absDiffY = Math.abs(diffY);
    
  //   var baseDirection = Math.atan(absDiffX/absDiffY);
  //   if(diffX > 0){
  //     if(diffY>0){
  //       this.direction = Math.PI - baseDirection;
  //     }else{
  //       this.direction = baseDirection;
  //     }
  //   }
  //   else{

  //     if(diffY>0){      
  //       this.direction = Math.PI + baseDirection;
  //     }else{
  //       this.direction = (2*Math.PI) - baseDirection;   
  //     }
  //   }
  //   var totalDiff = absDiffX + absDiffY;

  //   if( diffX!==0 ){
  //     if( diffY === 0  ){
  //       var absMoveX = pixelsPerMove;
  //     } else {
  //       var xRatio = absDiffX/totalDiff
  //       var absMoveX = pixelsPerMove * xRatio;
  //     }
  //     var xMove = Math.ceil( math.sign(diffX) * absMoveX );
  //     this.position.x = this.position.x + xMove;
  //   }

  //   if( diffY!==0 ){
  //     if( diffX === 0  ){
  //       var absMoveY = pixelsPerMove
  //     } else {
  //       var yRatio = absDiffY/totalDiff
  //       var absMoveY = pixelsPerMove * yRatio;
  //     }
  //     var yMove = Math.ceil( math.sign(diffY) * absMoveY );
  //     this.position.y = this.position.y + yMove;
  //   } 
  // }
})

module.exports = MoveableDisplayObject