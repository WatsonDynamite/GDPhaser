import { Monster } from './monster'

export class Team {
  name: string
  monsters: Monster[]

  constructor(name: string, monsters: Monster[]) {
    this.name = name
    this.monsters = monsters
  }
}
