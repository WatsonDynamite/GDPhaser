import { Vector2, Vector3 } from 'three'
import { Targeting } from './scripts/definitions/enums'
import { MoveTargeting } from './scripts/definitions/turnAction'
import { Type } from './scripts/definitions/type'

import bst from './assets/sprites/types/bst.png'
import ele from './assets/sprites/types/ele.png'
import ert from './assets/sprites/types/ert.png'
import fir from './assets/sprites/types/fir.png'
import ice from './assets/sprites/types/ice.png'
import lgt from './assets/sprites/types/lgt.png'
import mtl from './assets/sprites/types/mtl.png'
import mys from './assets/sprites/types/mys.png'
import nat from './assets/sprites/types/nat.png'
import rkn from './assets/sprites/types/rkn.png'
import shd from './assets/sprites/types/shd.png'
import tox from './assets/sprites/types/tox.png'
import wnd from './assets/sprites/types/wnd.png'
import wtr from './assets/sprites/types/wtr.png'

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

export function getTypeData(type: Type): { color: string; symbol: string } {
  //probably temporary
  switch (type) {
    case Type.ARCANE:
      return { color: '#fcba03', symbol: rkn }
    case Type.BEAST:
      return { color: '#99442c', symbol: bst }
    case Type.WATER:
      return { color: '#3e4bc2', symbol: wtr }
    case Type.FIRE:
      return { color: '#d61313', symbol: fir }
    case Type.NATURE:
      return { color: '#66cc2f', symbol: nat }
    case Type.ICE:
      return { color: '#39d0db', symbol: ice }
    case Type.ELECTRIC:
      return { color: '#fff566', symbol: ele }
    case Type.TOXIC:
      return { color: '#9936cf', symbol: tox }
    case Type.SHADOW:
      return { color: '#500778', symbol: shd }
    case Type.LIGHT:
      return { color: '#ffffb3', symbol: lgt }
    case Type.MYSTIC:
      return { color: '#e043c6', symbol: mys }
    case Type.EARTH:
      return { color: '#542614', symbol: bst }
    case Type.METAL:
      return { color: '#9c9c9c', symbol: mtl }
    case Type.WIND:
      return { color: '#daf2f1', symbol: wnd }
  }
}
