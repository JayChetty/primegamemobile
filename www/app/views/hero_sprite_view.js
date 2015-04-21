var HeroSpriteView = function(spec){
  var spec = spec || {}
  this.blobTexture = PIXI.Texture.fromImage("asset/blob2.png");
  this.horizontalTexture = PIXI.Texture.fromImage("asset/horizontal.png");
  this.verticalTexture = PIXI.Texture.fromImage("asset/vertical.png");

  this.wallTexture = PIXI.Texture.fromImage("asset/sheep2-stacked.png");
    
  this.leftWalk = PIXI.Texture.fromImage("asset/sheep2-1.png");
  this.rightWalk = PIXI.Texture.fromImage("asset/sheep2-1.png");
  this.walkTextures = [];
  this.walkTextures.push(this.leftWalk);
  this.walkTextures.push(this.leftWalk);
  this.phase = 0;
    
  this.model = spec.model;
  this.sprite = spec.sprite;
  this.sprite.setTexture(this.leftWalk)
  this.syncPosition();
  this.model.on('change',function(){
    this.syncPosition();
  },this)

  this.model.on('change:groupSize',function(){
    this.setGroupTexture();
  },this)

  this.model.on('change:vertical',function(){
    this.setWallTexture();
  },this)

  this.model.on('arrived-at-target',function(){
    this.setGroupTexture();
  },this)


  //clicks change position
  this.sprite.interactive = true;
  this.sprite.mouseup = function(data){
    if(this.model.groupSize ===2){
      this.model.vertical = !this.model.vertical
      this.setWallTexture();      
    }
  }.bind(this)
}


HeroSpriteView.prototype = {
  
  updatePosition:function(){
    this.phase++
    this.model.moveTowardsTarget();
    if(this.model.target && this.phase%10===0){     
      this.sprite.setTexture(this.walkTextures[this.phase%20/10]);     
    }   
  },
  
  setWallTexture:function(){
    if(this.model.vertical){
      this.sprite.setTexture(this.wallTexture);
      this.model.direction = Math.PI/2;
      this.sprite.rotation = Math.PI/2;
    }else{
      this.sprite.setTexture(this.wallTexture);
      this.model.direction = 0
      this.sprite.rotation = 0;
    }
  },
  syncPosition:function(){
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y;
    this.sprite.rotation = (Math.PI/2) - (this.model.direction);
  },
  setGroupTexture:function(){
    var texture = null
    switch(this.model.groupSize){
      case 2:
        this.setWallTexture();
        break;
      case 3:
        this.sprite.setTexture(this.blobTexture);
        break;
      default:
        this.sprite.setTexture(this.blobTexture);
        break;
    }
  }
}

module.exports = HeroSpriteView