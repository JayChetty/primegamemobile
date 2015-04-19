Hazard = require('./hazard');

Wall = Hazard.extend({
  props:{
    deflector:{
      type:'boolean',
      default: true
    },
    start:'object',
    end:'object',
    vertical:'boolean',
    thickness:{
      type:'number',
      default:5
    },
  },


  initialize:function(){
    if(!this.start || !this.end){return;}
    if(this.start.x === this.end.x){
      this.vertical = true;
    }else if(this.start.y === this.end.y){
      this.vertical = false;
    }else{
      throw "Wall must be vertical or horizontal";
    }
    this.position = this.start;

  },

  contact:function(position){
    if(this.vertical){
      return (position.y >= this.start.y && position.y <= this.end.y) && 
              Math.abs(position.x - this.start.x) < this.thickness
    }else{
      return (position.x >= this.start.x && position.x <= this.end.x) && 
              Math.abs(position.y - this.start.y) < this.thickness
    }
  }

})

module.exports = Wall