
// randomize starting starting X & Y positions
let randomX = Common.random(0, width+width/2),
    randomY = Common.random(-height/2,height+height/4);

const bodies = data.map((d, i)=> {
    var path = Matter.Vertices.fromPath(d.path)

    return  Bodies.fromVertices(randomX, randomY, path, {
      density: .00008,
      frictionAir: 0.1,
      restitution: 0.3,
      friction: 0.1,
      color: d.color,
      size: d.size,
      order: d.order,
      index: i,
      render: {
        sprite: {
          texture: `./assets/${d.image}`,
          xScale: 0.45,
          yScale: 0.45
        }
      }
       })
  })
const glass_per_line = {
1 : {glass_pieces: 1},
2 : {glass_pieces: 2},
3 : {glass_pieces: 9},
4 : {glass_pieces: 11},
5 : {glass_pieces: 15},
6 : {glass_pieces: 10},
7 : {glass_pieces: 11},
8 : {glass_pieces: 6},
}
const glass_piece_height = 60

function updateBodies (){
  World.remove(world, bodies)
  World.add(world, bodies)
  // setTimeout(()=>{
  //   bodies.forEach(b=>  b.isStatic = true)
  // }, 10000)
  }

World.add(world, bodies);