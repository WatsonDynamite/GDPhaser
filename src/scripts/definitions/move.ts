//this defines the structure of the moves that monsters use.

import { Category, Targeting } from './enums'
import { SecondaryEffect } from './secondaryEffect'
import { MoveTargeting } from './turnAction'
import { Type } from './type'

export class Move {
  //id for teambuilder and server purposes
  id: string
  //the name of a move
  name: string
  //the move's description
  desc: string
  //how much stamina the move costs to cast
  APCost: number
  //how much base power the move has
  power: number
  //what type the move is
  type: Type
  //Category: physical, special, status, see: Category class
  category: Category
  //Priority: Priority multiplier, this shouldn't go lower than 0.25x or higher than 4x but there are no other constraints to it.
  priority: number
  //array of special secondary effects triggered by the move
  secondaryEffects: SecondaryEffect[]
  //what the move targets
  targeting: MoveTargeting

  constructor(
    id: string,
    name: string,
    desc: string,
    power: number,
    cost: number,
    type: Type,
    category: Category,
    priority: 0.25 | 0.33 | 0.5 | 1 | 2 | 3 | 4,
    secondaryFX: SecondaryEffect[],
    targeting: MoveTargeting
  ) {
    this.id = id
    this.name = name
    this.desc = desc
    this.APCost = cost
    this.power = power
    this.type = type
    this.category = category
    this.priority = priority ?? 1
    this.secondaryEffects = secondaryFX
    this.targeting = targeting
  }
}
