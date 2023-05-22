import { Abilities } from '../definitions/ability'
import { Monster, MonsterDTO } from '../definitions/monster'
import { Type } from '../definitions/type'
import { moveList } from './moveList'
import _ from 'lodash'

export const charizard = new Monster(
  '0001',
  'Charizard',
  { t1: Type.FIRE, t2: Type.WIND },
  70,
  80,
  70,
  100,
  80,
  100,
  { m1: moveList.get('testMoveFire')! },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/charizard/charizard_f.png',
    backSpritePath: '/assets/sprites/monstersprites/charizard/charizard_b.png',
    miniSpritePath: '/assets/sprites/monstersprites/charizard/charizard_mini.png',
    portraitPath: '/assets/sprites/monstersprites/charizard/charizard_portrait.png'
  },
  "Greetings I'm Charizard"
)

export const blastoise = new Monster(
  '0002',
  'Blastoise',
  { t1: Type.WATER },
  100,
  70,
  100,
  80,
  80,
  70,
  { m1: moveList.get('testMoveWater')! },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/blastoise/blastoise_f.png',
    backSpritePath: '/assets/sprites/monstersprites/blastoise/blastoise_b.png',
    miniSpritePath: '/assets/sprites/monstersprites/blastoise/blastoise_mini.png',
    portraitPath: '/assets/sprites/monstersprites/blastoise/blastoise_portrait.png'
  },
  "Hello I'm Blastoise"
)

export const venusaur = new Monster(
  '0003',
  'Venusaur',
  { t1: Type.NATURE, t2: Type.TOXIC },
  100,
  70,
  80,
  80,
  100,
  70,
  { m1: moveList.get('testMoveNature')! },
  Abilities.TEST,
  {
    frontSpritePath: '/assets/sprites/monstersprites/venusaur/venusaur_f.png',
    backSpritePath: '/assets/sprites/monstersprites/venusaur/venusaur_b.png',
    miniSpritePath: '/assets/sprites/monstersprites/venusaur/venusaur_mini.png',
    portraitPath: '/assets/sprites/monstersprites/venusaur/venusaur_portrait.png'
  },

  "Sup I'm Venusaur"
)

export const monsterList = new Map<string, Monster>()
  .set(charizard.id, charizard)
  .set(blastoise.id, blastoise)
  .set(venusaur.id, venusaur)

export function InstanceMonsterFromID(id: string): Monster {
  return _.cloneDeep(monsterList.get(id)) as Monster
}

export function InstanceMonsterFromServerData(data: MonsterDTO): Monster {
  const { id, currentHP, battleId, statusEffect } = data
  const monster: Monster = _.cloneDeep(monsterList.get(id)) as Monster
  monster.setBattleId(battleId)
  monster.setMonsterState(currentHP)
  if (statusEffect) {
    // get status from list
    // monster.setStatusEffect(...)
  }
  return monster
}

export function cloneMonster(monster: Monster): Monster {
  return _.cloneDeep(monster) as Monster
}
