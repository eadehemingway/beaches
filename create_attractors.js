const one_attractor_button = document.getElementById('one_attractor')
const three_attractor_button = document.getElementById('three_attractors')
const line_up_vertical = document.getElementById('line_up_vertical')
const line_up_horizontal = document.getElementById('line_up_horizontal')
const multi_lines = document.getElementById('multi_lines')
const multi_lines_attractors = document.getElementById('multi_lines_attractors')


one_attractor_button.addEventListener('click', (e)=> {
    reset()
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

line_up_vertical.addEventListener("click", (d, i)=>{
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


line_up_horizontal.addEventListener("click", (d)=>{
  reset()

  const clossness = 0.0023 // the smaller the number the tighter the pieces

  bodies.forEach((b,index)=> {
    Matter.Body.setMass(b, clossness * index)


  })
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

multi_lines.addEventListener("click", (d, i)=>{
  reset()
  bodies.forEach(b=> {
    const pieces_per_line = glass_per_line[b.size].glass_pieces
    const y_offset = (pieces_per_line * glass_piece_height )/2
    const y_pos =( b.order * glass_piece_height) + 300
    Matter.Body.setPosition(b, {x: (100 * b.size), y: y_pos - y_offset })
  })
})

multi_lines_attractors.addEventListener("click", (d, i)=>{
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