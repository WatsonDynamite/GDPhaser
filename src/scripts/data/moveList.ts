import { Category, Targeting } from '../definitions/enums'
import { Move } from '../definitions/move'
import { Type } from '../definitions/type'

const testMoveFire = new Move('testMoveFire', 'Test - Fire', 'Test move', 50, 2, Type.FIRE, Category.SPECIAL, 1, [], {
  targeting: Targeting.SINGLE_ENEMY
})
const testMoveNature = new Move(
  'testMoveNature',
  'Test - Nature',
  'Test move',
  50,
  2,
  Type.NATURE,
  Category.SPECIAL,
  1,
  [],
  {
    targeting: Targeting.SINGLE_ENEMY
  }
)
const testMoveWater = new Move(
  'testMoveWater',
  'Test - Water',
  'Test move',
  50,
  2,
  Type.WATER,
  Category.SPECIAL,
  1,
  [],
  {
    targeting: Targeting.SINGLE_ENEMY
  }
)

export const moveList = new Map<string, Move>()
  .set(testMoveFire.id, testMoveFire)
  .set(testMoveNature.id, testMoveNature)
  .set(testMoveWater.id, testMoveWater)
