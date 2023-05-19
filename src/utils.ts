import { Vector2, Vector3 } from 'three'
import { Targeting } from './scripts/definitions/enums'
import { MoveTargeting } from './scripts/definitions/turnAction'
import { Type } from './scripts/definitions/type'

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
  switch (targeting) {
    case Targeting.SINGLE_TEAMMATE:
    case Targeting.MULTIPLE_TEAMMATE:
    case Targeting.MULTIPLE_GRID_SELF:
    case Targeting.MULTIPLE_GRID_SELF_FORMATION:
      return 'ally'
    case Targeting.SINGLE_ENEMY:
    case Targeting.MULTIPLE_ENEMY:
    case Targeting.MULTIPLE_GRID_OTHER:
    case Targeting.MULTIPLE_GRID_OTHER_FORMATION:
      return 'enemy'
  }
}

export function getTargetingGridOrMonster(moveTargeting: MoveTargeting) {
  const { targeting } = moveTargeting
  switch (targeting) {
    case Targeting.SINGLE_TEAMMATE:
    case Targeting.MULTIPLE_TEAMMATE:
    case Targeting.USER:
    case Targeting.SINGLE_ENEMY:
    case Targeting.MULTIPLE_ENEMY:
      return 'monster'
    case Targeting.SINGLE_GRID_ENEMY:
    case Targeting.SINGLE_GRID_SELF:
    case Targeting.MULTIPLE_GRID_OTHER:
    case Targeting.MULTIPLE_GRID_OTHER_FORMATION:
      return 'grid'
  }
}

export function getTypeColor(type: Type) {
  //probably temporary
  switch (type) {
    case Type.ARCANE:
      return '#fcba03'
    case Type.BEAST:
      return '#99442c'
    case Type.WATER:
      return '#3e4bc2'
    case Type.FIRE:
      return '#d61313'
    case Type.NATURE:
      return '#66cc2f'
    case Type.ICE:
      return '#39d0db'
    case Type.ELECTRIC:
      return '#fff566'
    case Type.TOXIC:
      return '#9936cf'
    case Type.SHADOW:
      return '#500778'
    case Type.LIGHT:
      return '#ffffb3'
    case Type.MYSTIC:
      return '#e043c6'
    case Type.EARTH:
      return '#542614'
    case Type.METAL:
      return '#9c9c9c'
    case Type.WIND:
      return '#daf2f1'
  }
}
