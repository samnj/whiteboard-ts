export default function distancePointerLine(
  P: number[],
  A: number[],
  B: number[]
) {
  // The segment is AB and the point is P. Create vectors AB, AP and BP
  const AB = [B[0] - A[0], B[1] - A[1]]
  const AP = [P[0] - A[0], P[1] - A[1]]
  const BP = [P[0] - B[0], P[1] - B[1]]

  // Compute the dot products AB.AP and AB.BP
  const AB_dot_AP = AB[0] * AP[0] + AB[1] * AP[1]
  const AB_dot_BP = AB[0] * BP[0] + AB[1] * BP[1]

  // If the dot product AB.AP is <= 0, A is the nearest point
  // If AB.BP is >= 0, B is the nearest point
  // For every other case the nearest point is between them and we compute the distance |AB X AP| / ||AB||
  if (AB_dot_AP <= 0) {
    return Math.sqrt(AP[0] * AP[0] + AP[1] * AP[1])
  } else if (AB_dot_BP >= 0) {
    return Math.sqrt(BP[0] * BP[0] + BP[1] * BP[1])
  } else {
    const modAB = Math.sqrt(AB[0] * AB[0] + AB[1] * AB[1])
    const crossAB_AP = Math.abs(AB[0] * AP[1] - AB[1] * AP[0])
    // It's not necessary to check for modAB = 0 because then AB_dot_AP = 0
    return crossAB_AP / modAB
  }
}
