import { Abilities } from '../definitions/ability'
import { Monster } from '../definitions/monster'
import { Moves } from '../definitions/move'
import { Type } from '../definitions/type'

export const charizard = new Monster(
  'charizard',
  { t1: Type.FIRE },
  100,
  100,
  100,
  100,
  100,
  100,
  { m1: Moves.testMove },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/charizard/charizard_f.png',
    backSpritePath: '/assets/sprites/monstersprites/charizard/charizard_b.png'
  }
)

export const blastoise = new Monster(
  'blastoise',
  { t1: Type.FIRE },
  100,
  100,
  100,
  100,
  100,
  100,
  { m1: Moves.testMove },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/charizard/charizard_f.png',
    backSpritePath: '/assets/sprites/monstersprites/charizard/charizard_b.png'
  }
)
