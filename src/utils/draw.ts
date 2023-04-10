import { Style } from '../store'

export default function draw(
  ctx: CanvasRenderingContext2D,
  pointsArray: number[],
  style: Style
) {
  ctx.strokeStyle = style.strokeStyle
  ctx.lineWidth = Number(style.lineWidth)

  if (pointsArray.length === 2) {
    ctx.beginPath()
    ctx.moveTo(pointsArray[0], pointsArray[1])
    ctx.lineTo(pointsArray[0], pointsArray[1])
    ctx.stroke()
    return
  }

  ctx.beginPath()
  ctx.moveTo(pointsArray[0], pointsArray[1])

  for (let i = 2; i < pointsArray.length - 4; i += 2) {
    const x = (pointsArray[i] + pointsArray[i + 2]) / 2
    const y = (pointsArray[i + 1] + pointsArray[i + 3]) / 2

    ctx.quadraticCurveTo(pointsArray[i], pointsArray[i + 1], x, y)
  }

  ctx.stroke()
}
