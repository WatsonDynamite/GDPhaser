import { Abilities } from '../definitions/ability'
import { Monster } from '../definitions/monster'
import { Type } from '../definitions/type'
import { Moves } from './moveList'

export const charizard = new Monster(
  'charizard',
  { t1: Type.FIRE, t2: Type.WIND },
  100,
  100,
  100,
  100,
  100,
  100,
  { m1: Moves.testMoveFire },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/charizard/charizard_f.png',
    backSpritePath: '/assets/sprites/monstersprites/charizard/charizard_b.png'
  }
)

export const blastoise = new Monster(
  'blastoise',
  { t1: Type.WATER },
  100,
  100,
  100,
  100,
  100,
  100,
  { m1: Moves.testMoveWater },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/blastoise/blastoise_f.png',
    backSpritePath: '/assets/sprites/monstersprites/blastoise/blastoise_b.png'
  }
)

export const venusaur = new Monster(
  'venusaur',
  { t1: Type.NATURE, t2: Type.TOXIC },
  100,
  100,
  100,
  100,
  100,
  100,
  { m1: Moves.testMoveNature },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/venusaur/venusaur_f.png',
    backSpritePath: '/assets/sprites/monstersprites/venusaur/venusaur_b.png'
  }
)
