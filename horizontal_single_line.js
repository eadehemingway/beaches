const horizontal_single_line = document.getElementById('horizontal_single_line')


horizontal_single_line.addEventListener("click", (d)=>{
    reset()

    const clossness = 0.0023 // the smaller the number the tighter the pieces

    // bodies.forEach((b,index)=> {
    //   Matter.Body.setMass(b, clossness * (index +1))
    // })
    attractor_bodies =  Bodies.circle(window.innerWidth, 500, 10, {
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
      world.gravity.y = 0
      world.gravity.x = -14

    World.add(world, attractor_bodies);
    Engine.update(engine);
    updateBodies()
  })