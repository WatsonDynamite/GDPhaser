import { FLAT } from '@enable3d/phaser-extension'
import { GridSpot } from '../../gameObjects/gridSpot'
import { Ability } from './ability'
import { StatusEffectIndex } from './enums'
import { Move } from './move'
import { Stat, StatWithModifier } from './stat'
import { StatusEffect } from './statusEffect'
import { Type } from './type'
import MonsterHP from '../../components/BattleScene/MonsterHP'
import BattleScene from '../scenes/battleScene'
import CustomEventDispatcher, { CustomEvents } from '../behaviors/CustomEventDispatcher'

/**
 * This is the template from which monsters are instanced.
 * Everything comes from this
 */
export class Monster {
  //NON VOLATILE DATA

  /** id, for teambuilder purposes */
  id: string
  /** id for battle tracking */
  private battleId?: string
  /** name of the monster */
  name: string
  /** primary type of the monster */
  type1: Type
  /** secondary type of the monster */
  type2?: Type

  /** dex entry */
  desc: string

  /** max health value (used for healing calculations and to display to the user). DO NOT CONFUSE WITH THE HP STAT ITSELF, BECAUSE I SURE DID. */
  maxHP: number

  /** The stats of the monster */
  stats: {
    con: Stat //HP
    str: StatWithModifier //ATK
    arm: StatWithModifier //DEF
    int: StatWithModifier //SP.ATK
    wis: StatWithModifier //SP.DEF
    dex: StatWithModifier //SPEED
  }

  /** The four moves of a monster
   * Some are optional, just in case
   */
  move1: Move
  move2?: Move
  move3?: Move
  move4?: Move

  /** The monster's ability */
  ability: Ability

  sprites: MonsterSpriteSet

  //VOLATILE DATA

  private gridSpot: GridSpot

  private gameObject: FLAT.SpriteSheet

  private nickname: string | null

  /** the current HP value. Think of this variable as the actual life bar. */
  currentHP: number
  /** status effect that the monster is currently afflicted with, if any */
  statusEffect?: StatusEffect

  constructor(
    id: string,
    name: string,
    types: { t1: Type; t2?: Type },
    con: number,
    str: number,
    arm: number,
    wis: number,
    int: number,
    dex: number,
    moves: { m1: Move; m2?: Move; m3?: Move; m4?: Move },
    ability: Ability,
    sprites: MonsterSpriteSet
  ) {
    this.id = id
    this.nickname = null
    this.name = name
    this.type1 = types.t1
    this.type2 = types.t2
    this.maxHP = con
    this.currentHP = con
    ;(this.stats = {
      con: new Stat(con),
      str: new StatWithModifier(str),
      arm: new StatWithModifier(arm),
      wis: new StatWithModifier(wis),
      int: new StatWithModifier(int),
      dex: new StatWithModifier(dex)
    }),
      (this.currentHP = con) //every monster starts at full health
    this.move1 = moves.m1
    this.move2 = moves.m2
    this.move3 = moves.m3
    this.move4 = moves.m4
    this.statusEffect = undefined //this definitely should not stay undefined
    this.ability = ability
    this.sprites = sprites
  }

  /**
   * set nickname
   */
  setNickname(newNick: string) {
    this.nickname = newNick
  }

  /**
   * get nickname
   */
  getNickname() {
    return this.nickname
  }

  /**
   * Used only for server syncing. Directly sets monster battle state
   */

  setMonsterState(curHP: number) {
    this.currentHP = curHP
  }

  /** Lowers the current HP of this monster by the amount specified by DMG.
   * @param dmg: value to damage the monster with
   */
  receiveDamage(dmg: number) {
    this.currentHP -= dmg

    if (this.currentHP <= 0) {
      this.currentHP = 0
    }

    CustomEventDispatcher.getInstance().emit(CustomEvents.REFRESH_UI)
  }

  /** Raises the current HP of this monster by the amount specified by DMG.
   * @param heal: value to heal the monster with
   * */
  healDamage(heal: number) {
    this.currentHP += heal

    if (this.currentHP > this.maxHP) {
      this.currentHP = this.maxHP
    }
  }

  /** @returns an array of the moves known by this monster. */
  getMoves(): Move[] {
    const moves: Move[] = []
    moves.push(this.move1)
    if (this.move2) moves.push(this.move2)
    if (this.move3) moves.push(this.move3)
    if (this.move4) moves.push(this.move4)
    return moves
  }

  /** Applies a status effect to this monster.
   * @param {StatusEffectIndex} type: the type of status effect
   * @param {number} turns: the amount of turns the effect should last
   */
  applyStatusEffect(type: StatusEffectIndex, turns: number) {
    this.statusEffect = new StatusEffect(type, turns)
  }

  /** Assigns this monster's gameobject (the visual representation in battle).
   * @param {FLAT.SpriteSheet} spritesheet: the spritesheet object that makes up the animations
   * @param {number} turns: the amount of turns the effect should last
   */
  setGameObject(obj: FLAT.SpriteSheet) {
    this.gameObject = obj
  }

  setGridSpot(obj: GridSpot) {
    this.gridSpot = obj
  }

  getGridSpot() {
    return this.gridSpot
  }

  getGameObject() {
    return this.gameObject
  }

  getMiniSprite() {
    return this.sprites.miniSpritePath
  }

  playAtkAnim() {
    if (this.gameObject) {
      this.gameObject.anims.play('jump').onComplete(() => {
        this.gameObject.anims.play('idle')
      })
    } else {
      console.error(`monster ${this.name} does not yet have a game object`)
    }
  }

  convertToDTO(): MonsterDTO {
    return {
      id: this.id,
      nickname: this.nickname,
      battleId: this.battleId!,
      currentHP: this.currentHP,
      statusEffect: this.statusEffect
        ? {
            type: this.statusEffect?.statusEffectType,
            turnCounter: this.statusEffect?.turnCounter,
            maxTurns: this.statusEffect?.maxTurns
          }
        : undefined
    }
  }

  setBattleId(id: string) {
    this.battleId = id
  }

  getBattleId() {
    return this.battleId
  }
}

export type MonsterSpriteSet = {
  frontSpritePath: string
  backSpritePath: string
  miniSpritePath: string
}

export type MonsterDTO = {
  id: string
  nickname: string | null
  battleId: string
  currentHP: number
  statusEffect?: {
    type: StatusEffectIndex
    maxTurns: number
    turnCounter: number
  }
}
