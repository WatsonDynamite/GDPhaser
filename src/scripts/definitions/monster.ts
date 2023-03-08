//this file defines the ScriptableObject template for the monsters in the game.
//it is essentially a "dumb" data structure. No functional purpose, it exists solely for the sake of data storage.

import { Ability } from "./ability";
import { StatusEffectIndex } from "./enums";
import { Move } from "./move";
import { Stat, StatWithModifier } from "./stat";
import { StatusEffect } from "./statusEffect";
import { Type } from "./type";

/**
 * This is the template from which monsters are instanced.
 * Everything comes from this
 */
export class Monster
{
    /** id, for teambuilder serialization purposes */
    id: number;
    /** name of the monster */
    name: string;
    /** primary type of the monster */
    type1: Type; 
    /** secondary type of the monster */
    type2?: Type; 

    /** dex entry */
    desc: string;

     /** max health value (used for healing calculations and to display to the user). DO NOT CONFUSE WITH THE HP STAT ITSELF, BECAUSE I SURE DID. */ 
     maxHP: number
     /** the current HP value. Think of this variable as the actual "life bar". */
     currentHP: number;
 
     /** status effect that the monster is currently afflicted with, if any */
     statusEffect?: StatusEffect;

    /** The stats of the monster */
    stats: {
        con: Stat;
        str: StatWithModifier;
        arm: StatWithModifier;
        wis: StatWithModifier;
        int: StatWithModifier;
        dex: StatWithModifier;
    }

    /** The four moves of a monster
     * Some are optional, just in case
     */
    move1: Move;
    move2?: Move;
    move3?: Move;
    move4?: Move;

    /** The monster's ability */
    ability: Ability;


    constructor(name: string, t1: Type, con: number, str: number, arm: number, wis: number, int: number, dex: number, m1: Move, ability: Ability, m2?: Move, m3?: Move, m4?: Move, t2?: Type){
        this.name = name;
        this.type1 = t1;
        this.type2 = t2;
        this.maxHP = con;
        this.stats = {
            con: new Stat(con),
            str: new StatWithModifier(str),
            arm: new StatWithModifier(arm),
            wis: new StatWithModifier(wis),
            int: new StatWithModifier(int),
            dex: new StatWithModifier(dex),
        },
        this.currentHP = con; //every monster starts at full health
        this.move1 = m1;
        this.move2 = m2;
        this.move3 = m3;
        this.move4 = m4;
        this.statusEffect = undefined; //this definitely should not stay "undefined"
    }

    /** Lowers the current HP of this monster by the amount specified by DMG.
     * @param dmg: value to damage the monster with
     */
    public receiveDamage(dmg: number){ 
        this.currentHP -= dmg;
        if(this.currentHP < 0){
            this.currentHP = 0;
        }
    }

    /** Raises the current HP of this monster by the amount specified by DMG.
     * @param dmg: value to heal the monster with
     * */
    public healDamage(dmg: number){  
        this.currentHP += dmg;
        if(this.currentHP > this.maxHP){
            this.currentHP = this.maxHP;
        }
    }

    /** @returns an array of the moves known by this monster. */
    public getMoves(): Move[] { 
        const moves: Move[] = [];
        moves.push(this.move1);
        if(this.move2) moves.push(this.move2);
        if(this.move3) moves.push(this.move3);
        if(this.move4) moves.push(this.move4);
        return moves;
    }

    /** Applies a status effect to this monster. 
     * @param {StatusEffectIndex} type: the type of status effect
     * @param {number} turns: the amount of turns the effect should last
    */
    public ApplyStatusEffect(type: StatusEffectIndex, turns: number){ 
        this.statusEffect = new StatusEffect(type, turns);
    }
}