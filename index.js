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
world.gravity.y = 0.0;
world.bodies = [];

// create a body with an attractor
var attractiveBodyOne = Bodies.circle(200, 300, 50, {

  isStatic: true,

  plugin: {
    attractors: [
      function(bodyA, bodyB) {

          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };

      }
    ]
  }
});
// var attractiveBodyTwo = Bodies.circle(900, 300, 50, {

//   isStatic: true,

//   plugin: {
//     attractors: [
//       function(bodyA, bodyB) {
//         if (bodyB.blue ){
//           return {
//             x: (bodyA.position.x - bodyB.position.x) * 1e-6,
//             y: (bodyA.position.y - bodyB.position.y) * 1e-6,
//           };

//         }
//       }
//     ]
//   }
// });
// World.add(world, attractiveBodyTwo);
World.add(world, attractiveBodyOne);

// randomize starting starting X & Y positions
let randomX = Common.random(0, width+width/2),
    randomY = Common.random(-height/2,height+height/4);



const bodies = data.map(d=> {
  console.log('d:', d.path)
  var path = Matter.Vertices.fromPath(d.path)

  return  Bodies.fromVertices(randomX, randomY, path, {
    density: .000008,
    frictionAir: 0.06,
    restitution: 0.3,
    friction: 0.1,
    blue: true,
    render: {
      sprite: {
        texture: `./assets/${d.image}`,
        xScale: 0.45,
        yScale: 0.45
      }
    }
     })
})
World.add(world, bodies);

Engine.run(engine);
