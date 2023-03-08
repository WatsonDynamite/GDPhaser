import { AbilityFrequency } from "./enums";
import { SecondaryEffect } from "./secondaryEffect";

/**this defines the structure of Monster abilities.
**/
export class Ability
{  
    name: string;
    desc: string;
    turnCounter: number;
    periodicity: number;
    frequency: AbilityFrequency;
    secondaryEffects: SecondaryEffect[];

    public Ability(name: string, desc: string, periodicity: number, frequency: AbilityFrequency, effects: SecondaryEffect[]) {
        this.name = name;
        this.desc = desc;
        this.turnCounter = 0;
        this.periodicity = periodicity;
        this.frequency = frequency;
        this.secondaryEffects = effects;
    }

}