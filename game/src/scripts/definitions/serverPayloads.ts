import { MonsterServerData } from './monster'

export type GameState = {
  player1: string
  player2: string
  field: {
    player1grid: { monster: MonsterServerData; row: number; col: number }[]
    player2grid: { monster: MonsterServerData; row: number; col: number }[]
  }
}
