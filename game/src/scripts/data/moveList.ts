import { Category, Targeting } from '../definitions/enums'
import { Move } from '../definitions/move'
import { Type } from '../definitions/type'

export const Moves = {
  testMoveFire: new Move('Test', 'Test move', 50, 2, Type.FIRE, Category.SPECIAL, 0, [], {
    targeting: Targeting.SINGLE_ENEMY
  }),
  testMoveNature: new Move('Test', 'Test move', 50, 2, Type.NATURE, Category.SPECIAL, 0, [], {
    targeting: Targeting.SINGLE_ENEMY
  }),
  testMoveWater: new Move('Test', 'Test move', 50, 2, Type.WATER, Category.SPECIAL, 0, [], {
    targeting: Targeting.SINGLE_ENEMY
  })
}
