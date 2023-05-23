import React from 'react'
import { Move } from '../../../../scripts/definitions/move'
import { Targeting } from '../../../../scripts/definitions/enums'

type MoveTargetingProps = {
  move: Move
}

export default function MoveTargeting({ move }: MoveTargetingProps) {
  function getMoveTargeting() {
    switch (move.targeting.targeting) {
      case Targeting.USER:
        return {
          label: 'User'
        }
      case Targeting.SINGLE_ENEMY:
        return {
          label: 'Any enemy'
        }
      case Targeting.SINGLE_TEAMMATE:
        return {
          label: 'Any enemy'
        }
      case Targeting.SINGLE_GRID_SELF:
        return {
          label: 'Any spot on your grid'
        }
      case Targeting.SINGLE_GRID_ENEMY:
        return {
          label: "Any spot on the enemy's grid"
        }
      case Targeting.MULTIPLE_ENEMY:
        return {
          label: `Any ${move.targeting.qty} enemies`
        }
      case Targeting.MULTIPLE_TEAMMATE:
        return {
          label: `Any ${move.targeting.qty} teammates`
        }
      case Targeting.MULTIPLE_GRID_OTHER:
        return {
          label: `Any ${move.targeting.qty} spots on the enemy\'s grid`
        }
      case Targeting.MULTIPLE_GRID_SELF:
        return {
          label: `Any ${move.targeting.qty} spots on your grid`
        }
      case Targeting.MULTIPLE_GRID_SELF_FORMATION:
        return {
          label: `A formation of spots on your grid:`,
          image: <MoveTargeting move={move} />
        }
      case Targeting.MULTIPLE_GRID_OTHER_FORMATION:
        return {
          label: `A formation of spots on the enemy's grid:`,
          image: <MoveTargeting move={move} />
        }
      default:
        return null
    }
  }

  return <>{}</>
}
