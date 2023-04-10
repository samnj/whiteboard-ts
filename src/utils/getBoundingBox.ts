export default function getBoundingBox(pointsArray: number[]) {
  const xArray = []
  const yArray = []

  for (let i = 0; i < pointsArray.length - 1; i += 2) {
    xArray.push(pointsArray[i])
    yArray.push(pointsArray[i + 1])
  }
  const minX = Math.min(...xArray)
  const maxX = Math.max(...xArray)
  const minY = Math.min(...yArray)
  const maxY = Math.max(...yArray)
  return { minX, maxX, minY, maxY }
}
