const redraw_button = document.getElementById('redraw')
const color_attractors = [{x: 300, y: 400, color: "white"}, {x: 600, y: 400, color: "brown"}, {x: 900, y: 400, color: 'green'}]

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

redraw_button.addEventListener('click', (e)=> {
    World.remove(world, attractor_bodies)
    const attr_bod =  Bodies.circle(600, 300, 10, {
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

    World.add(world, attr_bod);
    Engine.update(engine);
    updateBodies()
})

World.add(world, attractor_bodies);
