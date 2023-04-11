import { MonsterDTO } from './monster'
import { TurnActionDTO } from './turnAction'

export type GameState = {
  player1: string | null
  player2: string | null
  field: {
    player1grid: { monster: MonsterDTO; row: number; col: number }[]
    player2grid: { monster: MonsterDTO; row: number; col: number }[]
  }
}

export type PendingState = {
  player1TurnActions: TurnActionDTO[]
  player2TurnActions: TurnActionDTO[]
}

export type Message = { user: string; message: string }
