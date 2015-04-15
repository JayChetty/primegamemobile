
var SpriteView = require('./sprite_view')

var StageView = function(spec){
  var horizontalTexture = PIXI.Texture.fromImage("asset/horizontal.png");
  var verticalTexture = PIXI.Texture.fromImage("asset/vertical.png");

  //set up stage
  this.drawCount = 0
  this.complete = false;
  this.stage = spec.stage;
  this.renderer = spec.renderer;
  this.inHit = false;


  var farTexture = PIXI.Texture.fromImage("asset/grass.png");
  var far = new PIXI.Sprite(farTexture);
  far.position.x = 0;
  far.position.y = 0;
  this.stage.addChild(far);


  //set up heroteam
  this.heroTeamSpriteView = spec.heroTeamSpriteView;
  this.stage.addChild(this.heroTeamSpriteView.sprite);

  //go to clicks on stage
  this.stage.touchstart = function(data){
    console.log('touchstart');
    this.heroTeamSpriteView.model.target = { position: { x:data.global.x, y:data.global.y }}
  }.bind(this)
  
  this.stage.mousedown = function(data){
    console.log('mousedown');
    this.heroTeamSpriteView.model.target = { position: { x:data.global.x, y:data.global.y }}
  }.bind(this)

  //set up helpee
  this.helpeeSpriteView = spec.helpeeSpriteView;
  this.helpeeSpriteView.deflectorBuffer = 0;
  this.stage.addChild(this.helpeeSpriteView.sprite);

  //setup target
  this.targetSpriteView = spec.targetSpriteView;
  this.stage.addChild(this.targetSpriteView.sprite);

  //add other objects(hazards etc)
  this.spriteViews = spec.spriteViews;
  this.spriteViews.forEach(function(spriteView){
    this.stage.addChild(spriteView.sprite);
    spriteView.sprite.interactive = true;
//    spriteView.sprite.touchend = function(data){
//      this.stageView.heroTeamSpriteView.model.target = this.target.model
//    }.bind({stageView:this, target:spriteView})
  },this)

  //start animation
  requestAnimationFrame(this.animate.bind(this));

}

StageView.prototype = {
  animate: function(){
    if (this.drawCount%1===0){
      this.checkComplete();
      this.checkHelpeeContact();
      this.checkHeroContact();
      this.updatePositions();
    }
    this.renderer.render(this.stage);


    if(!this.complete && !this.helpeeSpriteView.model.stuck){
      requestAnimationFrame(this.animate.bind(this));
    } else{
      if(this.complete){
        alert("Level Complete, good work")
      }else{
        alert("Ah man, friend is in trouble")
      }
    }
    
    this.drawCount++;
  },
  updatePositions:function(){   
    this.heroTeamSpriteView.updatePosition();
    this.helpeeSpriteView.model.moveInDirection();
  },

  checkComplete:function(){
    if(this.helpeeSpriteView.model.position.distanceTo(this.targetSpriteView.model.position) < 15){
      this.complete = true;
    }
  },
  checkHeroContact:function(){
    this.spriteViews.forEach(function(spriteView){
      if(this.heroTeamSpriteView.model.inContact(spriteView.model)){
        spriteView.model.protector = this.heroTeamSpriteView.model;
        if(!this.heroTeamSpriteView.model.inHit){
          this.heroTeamSpriteView.model.inHit = true;
          if(spriteView.model.deflector){
            this.heroTeamSpriteView.model.target = null;//stop moving
          }
        }else{
          this.heroTeamSpriteView.model.inHit = false;
        }
      }else{
        spriteView.model.protector = null;
      }
    },this)
  },

  checkHelpeeContact:function(){
    var helpee = this.helpeeSpriteView.model;
    var anyContactYet = false

    if(this.helpeeSpriteView.deflectorBuffer > 0){this.helpeeSpriteView.deflectorBuffer--;}

    var checkContact = function(obj){
      if(helpee.inContact(obj)){
        anyContactYet = true;

        if(obj.hazard && !obj.protected()){
          helpee.stuck = true;
        }
        if( obj.deflector && this.helpeeSpriteView.deflectorBuffer == 0 ){
          this.helpeeSpriteView.deflectorBuffer = 20 //you get to move for x steps after deflection
          if(obj.vertical){
            this.helpeeSpriteView.model.direction = (Math.PI) - this.helpeeSpriteView.model.direction;
          } else{
            this.helpeeSpriteView.model.direction = (Math.PI*2) - this.helpeeSpriteView.model.direction;
          }
        }
      }

    }.bind(this)    

    this.spriteViews.forEach(function(spriteView){
      checkContact(spriteView.model)
    },this)
    if(!anyContactYet){
      checkContact(this.heroTeamSpriteView.model)
    } 
  }
}

module.exports = StageView;