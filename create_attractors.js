const one_attractor_button = document.getElementById('one_attractor')
const three_attractor_button = document.getElementById('three_attractors')
const color_attractors = [{x: 300, y: 400, color: "white"}, {x: 600, y: 400, color: "brown"}, {x: 900, y: 400, color: 'green'}]
let attractor_bodies=[]

one_attractor_button.addEventListener('click', (e)=> {
    World.remove(world, attractor_bodies)
    attractor_bodies =  Bodies.circle(600, 300, 10, {
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

    World.add(world, attractor_bodies);
    Engine.update(engine);
    updateBodies()
})
three_attractor_button.addEventListener('click', (e)=> {
    World.remove(world, attractor_bodies)

    attractor_bodies = color_attractors.map(d=> {
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
    Engine.update(engine);
    updateBodies()
})


