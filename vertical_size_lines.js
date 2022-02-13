const vertical_size_lines = document.getElementById('vertical_size_lines')

vertical_size_lines.addEventListener("click", (d, i)=>{
  reset()

  const sizes = [1, 2, 3, 4, 5, 6, 7, 8]
  const size_attractors = sizes.map((s,i)=> {
    const num_pieces = glass_per_line[s].glass_pieces
    const offset = (num_pieces * glass_piece_height)/2
    return {
      x: 300 + (i*100),
      y: 500 - offset,
      size: s
    }
  })

   attractor_bodies = size_attractors.map(d=> {
     return Bodies.circle(d.x, d.y, 10, {
          isStatic: true,
          plugin: {
            attractors: [
              function(bodyA, bodyB) {

               if (d.size === bodyB.size){
                    const clossness = 0.008 // the smaller the number the tighter the pieces
                    Matter.Body.setMass(bodyB, clossness * bodyB.order)
                    const y = (bodyA.position.y - bodyB.position.y) * 0.000001
                    const x = (bodyA.position.x - bodyB.position.x) * 0.000001

                      return {
                          x,
                          y
                        };
                  }
              },
            ],

          }
        });
  })

  world.gravity.y = 7
   World.add(world, attractor_bodies);
   Engine.update(engine);
   updateBodies()

})