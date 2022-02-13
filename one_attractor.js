const one_attractor_button = document.getElementById('one_attractor')

one_attractor_button.addEventListener('click', (e)=> {
    reset()
    attractor_bodies =  Bodies.circle(600, 300, 10, {
        isStatic: true,
        plugin: {
          attractors: [
            function(bodyA, bodyB) {
                // Matter.Body.setMass(bodyB, 0.2)
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
