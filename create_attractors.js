
const color_attractors = [{x: 100, y: 400, color: "white"}, {x: 400, y: 400, color: "brown"}, {x: 800, y: 400, color: 'green'}]

const attractor_bodies = color_attractors.map(d=> {
   return Bodies.circle(d.x, d.y, 10, {

        isStatic: true,

        plugin: {
          attractors: [
            function(bodyA, bodyB) {
                if (d.color === bodyB.color){

                    return {
                        x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                        y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                      };
                }


            }
          ]
        }
      });
})
World.add(world, attractor_bodies);
