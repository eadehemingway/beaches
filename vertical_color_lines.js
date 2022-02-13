const vertical_color_lines = document.getElementById('vertical_color_lines')


vertical_color_lines.addEventListener("click", (d, i)=>{
    reset()

    const color_attractors = [{x: 300, y: 0, color: "white"}, {x: 600, y: 0, color: "brown"}, {x: 900, y: 0, color: 'green'}]

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
   world.gravity.x = 0
   world.gravity.y = 7
    World.add(world, attractor_bodies);
    Engine.update(engine);
    updateBodies()

  })