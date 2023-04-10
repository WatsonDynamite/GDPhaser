import { Abilities } from '../definitions/ability'
import { Monster, MonsterServerData } from '../definitions/monster'
import { Type } from '../definitions/type'
import { Moves } from './moveList'
import _ from 'lodash'

export const charizard = new Monster(
  'test-charizard',
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
    backSpritePath: '/assets/sprites/monstersprites/charizard/charizard_b.png',
    miniSpritePath: '/assets/sprites/monstersprites/charizard/charizard_mini.png'
  }
)

export const blastoise = new Monster(
  'test-blastoise',
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
    backSpritePath: '/assets/sprites/monstersprites/blastoise/blastoise_b.png',
    miniSpritePath: '/assets/sprites/monstersprites/blastoise/blastoise_mini.png'
  }
)

export const venusaur = new Monster(
  'test-venusaur',
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
    backSpritePath: '/assets/sprites/monstersprites/venusaur/venusaur_b.png',
    miniSpritePath: '/assets/sprites/monstersprites/venusaur/venusaur_mini.png'
  }
)

const monsterList = {
  [charizard.id]: charizard,
  [blastoise.id]: blastoise,
  [venusaur.id]: venusaur
}

export function InstanceMonsterFromServerData(data: MonsterServerData): Monster {
  const { id, currentHP } = data
  const monster: Monster = _.cloneDeep(monsterList[id]) as Monster
  monster.setMonsterState(currentHP)
  return monster
}
