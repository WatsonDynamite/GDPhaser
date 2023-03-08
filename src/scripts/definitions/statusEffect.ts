import { StatusEffectIndex } from "./enums";

/** this defines the status effects that monsters can have in battle */
export class StatusEffect
{
    /** this defines the type that this status effect will be. */
    statusEffectType: StatusEffectIndex;
    /** this defines the number of turns that this status effect will be active. This isn't defined by the type in order to give more freedon. */
    maxTurns: number;       
    /** counts the number of turns that this status effect has been active. Obviously the idea here is that once this number equals maxTurns, the effect fades. */                     
    turnCounter: number;                         

    constructor(type: StatusEffectIndex, maxTurns: number){
        this.statusEffectType = type;
        this.maxTurns = maxTurns;
        this.turnCounter = 0;
    }

    public IncrementStatusCounter(){
        this.turnCounter++;
    }
}

