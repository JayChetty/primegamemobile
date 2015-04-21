var HelpeeSpriteView = function(spec){
  var spec = spec || {}

    
  this.leftWalk = PIXI.Texture.fromImage("asset/dog.png");
  this.rightWalk = PIXI.Texture.fromImage("asset/dog.png");
  this.walkTextures = [];
  this.walkTextures.push(this.leftWalk);
  this.walkTextures.push(this.rightWalk);
  this.phase = 0;
    
  this.model = spec.model;
  this.sprite = spec.sprite;
  this.sprite.setTexture(this.leftWalk)
  this.syncPosition();

  this.model.on('change',function(){
    this.syncPosition();
  },this)

  //clicks change position
  this.sprite.interactive = true;

}


HelpeeSpriteView.prototype = {
  
  updatePosition:function(){
    this.phase++
    this.model.moveInDirection();
    if(this.model.target && this.phase%10===0){     
      this.sprite.setTexture(this.walkTextures[this.phase%20/10]);     
    }   
  },
  

  syncPosition:function(){
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y;
    this.sprite.rotation = (Math.PI/2) - (this.model.direction);
  },

}

module.exports = HelpeeSpriteView