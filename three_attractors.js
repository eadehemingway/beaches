const three_attractor_button = document.getElementById('three_attractors')


three_attractor_button.addEventListener('click', (e)=> {
    reset()
    const color_attractors = [{x: 300, y: 400, color: "white"}, {x: 600, y: 400, color: "brown"}, {x: 900, y: 400, color: 'green'}]

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