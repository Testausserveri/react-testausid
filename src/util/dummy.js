export default function dummy(height, width) {
  const canvas = document.createElement('canvas')
  canvas.height = height ?? 80
  canvas.width = width ?? 80
  canvas.style.visibility = 'hidden'
  document.body.append(canvas)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#8bbaff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = '80px Poppins' // TODO: We need to make sure the font is loaded
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.fillText(
    '?',
    canvas.width / 2 + canvas.width / 48,
    canvas.height - canvas.height / 6
  )
  return canvas.toDataURL()
}
