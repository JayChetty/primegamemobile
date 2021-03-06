(function() {
    var StageView = require('./views/stage_view');
    var TeamView = require('./views/team_view');
    var DisplayObject = require('./models/display_object');

    var Hazard = require('./models/hazard');
    var HeroTeam = require('./models/hero_team');
    var Helpee = require('./models/helpee');
    var Wall = require('./models/wall');

    var Position = require('./models/position');
    var SpriteView = require('./views/sprite_view');
    var HeroSpriteView = require('./views/hero_sprite_view');
    var HelpeeSpriteView = require('./views/helpee_sprite_view');
    var app = require('ampersand-app');

    var level = 1

    document.addEventListener('DOMContentLoaded', function() {
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);
        // create a renderer instance
        var width = screen.availWidth;
        var height = screen.availHeight;
        var renderer = PIXI.autoDetectRenderer(width, height);

        var blobTexture = PIXI.Texture.fromImage("asset/blob2.png");
        var dogTexture = PIXI.Texture.fromImage("asset/dog.png");
        var horizontalTexture = PIXI.Texture.fromImage("asset/horizontal.png");
        var hazardTexture = PIXI.Texture.fromImage("asset/hazard.png");
        var wall64Texture = PIXI.Texture.fromImage("asset/wall64.png");
        //set up models
        if(level === 1){//params for 
            // var heroStart = new Position({x:200, y:200})
            var heroSizeStart = 2
            // var helpeeStart = new Position({x:100,y:100})
            var helpeeDirectionStart = 0
            var targetPosition = new Position({x:400,y:200})
        }

        var heroTeamModel = new HeroTeam({position:{x:200,y:100}, speed: 5, size:heroSizeStart})
        var helpeeModel = new Helpee({speed: 1, position:{x:100,y:100}, direction: helpeeDirectionStart })
        var targetModel = new DisplayObject({position:{x:400,y:200}})

        var spriteViews = []
        if(level === 1){
            var wallStart = new Position({x:200, y:100})
            var wallEnd = new Position({x:264, y:100})
            var wallModel = new Wall({start:wallStart, end:wallEnd})

            var hazardModel = new Hazard({speed: 1, position:{x:250,y:60}, protectorPrimes:[3]})

            //and sprites
            var heroTeamSprite = new PIXI.Sprite(horizontalTexture);
            var targetSprite = new PIXI.Sprite(blobTexture);
            var helpeeSprite = new PIXI.Sprite(dogTexture);

            var hazardSprite = new PIXI.Sprite(hazardTexture);
            var wallSprite = new PIXI.Sprite(wall64Texture);

            //create views
            var spriteViews = [];//add additional object to this eg hazards
    //        var hazardSpriteView = new SpriteView({ model:hazardModel, sprite:hazardSprite });
            var wallSpriteView = new SpriteView({ model:wallModel, sprite:wallSprite });
    //        spriteViews.push(hazardSpriteView)
            spriteViews.push(wallSpriteView)
        }

        var targetView = new SpriteView({ model:targetModel, sprite:targetSprite });
        var heroTeamView = new HeroSpriteView({ model:heroTeamModel, sprite:heroTeamSprite });
        var helpeeView = new HelpeeSpriteView({ model:helpeeModel, sprite:helpeeSprite });
        //create stage
        var teamView = new TeamView({model:heroTeamModel});
        var teamEl = document.body.querySelector('.team-container');
        console.log('teamEl', teamEl);
        teamEl.appendChild(teamView.render().el);


        //create view for the stage and sprites
        var stageView = new StageView({
            renderer:renderer,
            heroTeamSpriteView: heroTeamView,
            stage: stage,
            spriteViews:spriteViews,
            helpeeSpriteView: helpeeView,
            targetSpriteView:targetView,
            width:width,
            height:height,
            borderWalls:{
                top:false,
                bottom:true,
                right:true,
                left:true
            }
        })
        document.body.appendChild(stageView.renderer.view);  

       
    }, false);

}());
