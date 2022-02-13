const vertical_size_lines_manual = document.getElementById('vertical_size_lines_manual')

vertical_size_lines_manual.addEventListener("click", (d, i)=>{
    reset()
    bodies.forEach(b=> {
      const pieces_per_line = glass_per_line[b.size].glass_pieces
      const y_offset = (pieces_per_line * glass_piece_height )/2
      const y_pos =( b.order * glass_piece_height) + 300
      Matter.Body.setPosition(b, {x: (100 * b.size), y: y_pos - y_offset })
    })
  })