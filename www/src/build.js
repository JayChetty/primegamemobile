(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/jay/primegamemobile/www/app/main.js":[function(require,module,exports){
(function() {

    document.addEventListener('DOMContentLoaded', function() {
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);

        // create a renderer instance
        var width = screen.availWidth;
        var height = screen.availHeight;
        var renderer = PIXI.autoDetectRenderer(width, height);

        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        requestAnimFrame(animate);

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("asset/bunny.png");

        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);

        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // move the sprite to the center of the screen
        bunny.position.x = width / 2;
        bunny.position.y = height / 2;

        stage.addChild(bunny);

        function animate() {
            requestAnimFrame(animate);

            // just for fun, let's rotate mr rabbit a little
            bunny.rotation += 0.1;

            // render the stage
            renderer.render(stage);
        }
    }, false);

}());

},{}]},{},["/home/jay/primegamemobile/www/app/main.js"]);
