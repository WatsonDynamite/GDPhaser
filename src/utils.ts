import { Vector2, Vector3 } from 'three'
import { Targeting } from './scripts/definitions/enums'
import { MoveTargeting } from './scripts/definitions/turnAction'

export function getScreenPositionFromWorldSpace(
  position: Vector3,
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
): Vector2 {
  const positionCpy = new Vector3(position.x, position.y, position.z)
  const vector = positionCpy.project(camera)

  vector.x = Math.round((0.5 + vector.x / 2) * window.innerWidth)
  vector.y = Math.round((0.5 - vector.y / 2) * window.innerHeight)

  const xPercent = (vector.x / window.innerWidth) * 100
  const yPercent = (vector.y / window.innerHeight) * 100

  return new Vector2(xPercent, yPercent)
}

export function getTargetingPolarity(moveTargeting: MoveTargeting) {
  const { targeting } = moveTargeting
  if (
    targeting === Targeting.SINGLE_TEAMMATE ||
    targeting === Targeting.MULTIPLE_TEAMMATE ||
    targeting === Targeting.MULTIPLE_GRID_SELF ||
    targeting === Targeting.MULTIPLE_GRID_SELF_FORMATION
  ) {
    return 'ally'
  }
  if (
    targeting === Targeting.SINGLE_ENEMY ||
    targeting === Targeting.MULTIPLE_ENEMY ||
    targeting === Targeting.MULTIPLE_GRID_OTHER ||
    targeting === Targeting.MULTIPLE_GRID_OTHER_FORMATION
  ) {
    return 'enemy'
  }
}

export function getTargetingGridOrMonster(moveTargeting: MoveTargeting) {
  const { targeting } = moveTargeting
  if (
    targeting === Targeting.SINGLE_TEAMMATE ||
    targeting === Targeting.MULTIPLE_TEAMMATE ||
    targeting === Targeting.USER ||
    targeting === Targeting.SINGLE_ENEMY ||
    targeting === Targeting.MULTIPLE_ENEMY
  ) {
    return 'monster'
  }
  if (
    targeting === Targeting.SINGLE_GRID_ENEMY ||
    targeting === Targeting.SINGLE_GRID_SELF ||
    targeting === Targeting.MULTIPLE_GRID_OTHER ||
    targeting === Targeting.MULTIPLE_GRID_OTHER_FORMATION
  ) {
    return 'grid'
  }
}
