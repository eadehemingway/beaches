
const make_glass_bigger = document.getElementById('make_glass_bigger')

make_glass_bigger.addEventListener('click', (e)=> {
    reset()
    bodies.forEach(b=> {
    Matter.Body.scale(b, 3, 3) // this scales the physics but not the photos...
    b.render.sprite.xScale = 1.4
    b.render.sprite.yScale = 1.4
    })

    World.add(world, attractor_bodies);
    Engine.update(engine);
    updateBodies()
})
