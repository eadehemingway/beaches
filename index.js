var canvas = document.getElementById('canvas');

// install plugin
Matter.use(
  'matter-attractors'
);

// variables
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Render = Matter.Render,
    Mouse = Matter.Mouse,
    Vertices = Matter.Vertices,
    height = window.innerHeight,
    width = window.innerWidth
// create engine
var engine = Engine.create();

// create renderer
var render = Render.create({
    element: canvas,
    engine: engine,
    options: {
        wireframes: false,
        showAngleIndicator: false,
        background: 'transparent',
        height: height,
        width: width
    }
});
Render.run(render);

// create world
var world = engine.world;
world.gravity.x = 0;
world.gravity.y = 0.01;
world.bodies = [];

// create a body with an attractor
var attractiveBodyOne = Bodies.circle(200, 300, 50, {

  isStatic: true,

  plugin: {
    attractors: [
      function(bodyA, bodyB) {
      console.log('bodyB:', bodyB)

        if (!bodyB.blue){
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };

        }

      }
    ]
  }
});
var attractiveBodyTwo = Bodies.circle(900, 300, 50, {

  isStatic: true,

  plugin: {
    attractors: [
      function(bodyA, bodyB) {
        if (bodyB.blue ){
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };

        }
      }
    ]
  }
});
World.add(world, attractiveBodyOne);
World.add(world, attractiveBodyTwo);

// randomize starting starting X & Y positions
let randomX = Common.random(0, width+width/2),
    randomY = Common.random(-height/2,height+height/4);

var cherries = Matter.Vertices.fromPath ("4632.90610302337 1606.48993231831 4635.85388558808 1629.72020113174 4658.26438664809 1720.00156837195 4718.04538647838 1741.99874750627 4838.3844299161 1742.78983467671 4906.11559040485 1741.02063607217 4928.22341771857 1664.33395523638 4864.19268876427 1609.42015896159 4759.94170930749 1534.46422052224");


// main bodies
var bodies = function () {
  return [
    Bodies.fromVertices(randomX, randomY, cherries, {
      density: .000008,
      frictionAir: 0.006,
      restitution: 0.3,
      friction: 0.01,
      blue: true

   		}),
    Bodies.circle(randomX, randomY, 50, {
      density: .000008,
      frictionAir: 0.009,
      restitution: 0.3,
      friction: 0.6,
      blue: false
   		}),

  ]
};
World.add(world, bodies());

Engine.run(engine);
