const mock_data = [
    {
        image: "Glass-01.png",
        path: "9.08 0 43.59 3.45 47.59 4.54 52.85 10.35 62.84 20.89 72.83 30.33 74.47 33.96 72.65 39.59 67.2 45.77 53.58 56.67 43.59 59.39 29.79 59.94 21.8 59.03 13.44 55.4 3.45 44.5 0.18 38.14 0.73 28.15 0 21.07 0.18 10.53 0.36 4.18 1.82 2 9.08 0",
        color: "white"
    },
    {
        image: "Glass-02.png",
        path: "8.54 6.54 36.87 7.08 68.65 5.99 89.36 2.36 99.35 0 104.62 0.55 106.98 3.09 108.43 6.9 105.89 14.35 100.44 26.88 96.44 39.23 87.91 47.04 81.73 52.67 77.37 53.58 73.56 51.4 68.84 47.22 64.11 45.95 52.85 38.69 45.23 38.14 33.24 33.96 19.25 25.25 6.72 21.43 0.91 19.07 0 16.89 1.45 9.99 5.09 6.72 8.54 6.54",
        color: "brown"

    },
    {
        image: "Glass-04.png",
        path: "42.14 1.27 28.7 5.81 11.62 11.26 2.18 16.35 0 18.89 0 22.16 2.18 25.43 5.81 27.79 9.26 28.7 23.25 43.77 28.7 50.67 33.6 52.31 42.32 53.22 57.21 52.13 62.12 49.77 63.75 42.86 65.93 29.06 69.2 21.43 69.2 16.53 64.11 10.17 55.4 2.18 50.49 0 42.14 1.27",
        color: "green"

    }]
// randomize starting starting X & Y positions
let randomX = Common.random(0, width+width/2),
    randomY = Common.random(-height/2,height+height/4);

const bodies = data.map((d, i)=> {
    var path = Matter.Vertices.fromPath(d.path)

    return  Bodies.fromVertices(randomX, randomY, path, {
      density: .00008,
      frictionAir: 0.08,
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

function manualLineUpBodies(){
  bodies.forEach(b=> {
    const pieces_per_line = glass_per_line[b.size].glass_pieces
    const y_offset = (pieces_per_line * 50 )/2
    const y_pos =( b.order * 50) + 300
    Matter.Body.setPosition(b, {x: (100 * b.size), y: y_pos - y_offset })

  })

}


function updateBodies (){
  World.remove(world, bodies)
  World.add(world, bodies)
}
World.add(world, bodies);