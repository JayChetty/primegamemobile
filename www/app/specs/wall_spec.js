var assert = require("assert");
var expect = require("chai").expect;
var Wall = require("../models/wall.js");
it('should be a hazard',function(){
  var wall = new Wall();
  expect(wall.hazard).to.equal(true)
})
it('should be a deflector',function(){
  var wall = new Wall();
  expect(wall.deflector).to.equal(true)
})
it('should have a start and end position',function(){
  start = new Position({x:0,y:0});
  end = new Position({x:10,y:0});
  var wall = new Wall({start:start, end:end});
  expect(wall.end.x).to.equal(10)
})

it('should set has horizontal',function(){
  start = new Position({x:0,y:0});
  end = new Position({x:10,y:0});
  var wall = new Wall({start:start, end:end});
  expect(wall.vertical).to.equal(false)
})
it('should set has vertical',function(){
  start = new Position({x:0,y:0});
  end = new Position({x:0,y:10});
  var wall = new Wall({start:start, end:end});
  expect(wall.vertical).to.equal(true)
})

it('know when something is in contact',function(){
  start = new Position({x:0,y:0});
  end = new Position({x:10,y:0});
  var wall = new Wall({start:start, end:end});
  var position = new Position({x:5, y:0})
  expect(wall.contact(position)).to.equal(true)
})

it('know when something is not in contact',function(){
  start = new Position({x:0,y:0});
  end = new Position({x:10,y:0});
  var wall = new Wall({start:start, end:end});
  var position = new Position({x:20, y:0})
  expect(wall.contact(position)).to.equal(false)
})