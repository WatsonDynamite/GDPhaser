/** this is the data structure for the CONSTITUTION stat of a monster.
*/
export class Stat {
    value: number;       //base value

    constructor(val: number){  //generates stat
        this.value = val;
    }

}

/** this is basic the data structure for the stats of a monster that aren't CONSTITUTION
 * (can receive buffs or debuffs).
*/
export class StatWithModifier extends Stat {
    stage: number;       //buff stage
    statMod: number;   //value of modifier to apply

    /** used to easily access a stat after modifiers. ALWAYS USE THIS FOR DAMAGE CALCULATION unless the move is supposed to ignore modifiers. */
    public getTrueValue(): number { 
        return this.value * this.statMod;
    }

    constructor(val: number){
        super(val);
        this.statMod = 1;
        this.stage = 0;
    }

    
    /** boosts a stat for a certain number of stages
     * @{amount} the amount of stages to buff the stat. default: 1
     * */
    public buffStat(amount = 1): boolean{ 
        if(this.stage < 6){
            this.stage+=amount;
            switch (this.stage){
                case 6:   this.statMod = 4; break;
                case 5:   this.statMod = 3.5; break;
                case 4:   this.statMod = 3; break;
                case 3:   this.statMod = 2.5; break;
                case 2:   this.statMod = 2; break;
                case 1:   this.statMod = 1.5; break;
                case 0:   this.statMod = 1; break;
                case -1:  this.statMod = 0.66; break;
                case -2:  this.statMod = 0.5; break;
                case -3:  this.statMod = 0.4; break;
                case -4:  this.statMod = 0.33; break;
                case -5:  this.statMod = 0.28; break;
                case -6:  this.statMod = 0.25; break;
            }
            return true;
        }else{
            console.log("This stat cannot go any higher!");
            return false;
        }
    }

    /** lowers a stat for a certain number of stages
     * @{amount} the amount of stages to lower the stat. default: 1
     * */
    public debuffStat(amount = 1): boolean {
        if(this.stage > -6){
            this.stage-= amount;
            switch (this.stage){
                case 6:   this.statMod = 4; break;
                case 5:   this.statMod = 3.5; break;
                case 4:   this.statMod = 3; break;
                case 3:   this.statMod = 2.5; break;
                case 2:   this.statMod = 2; break;
                case 1:   this.statMod = 1.5; break;
                case 0:   this.statMod = 1; break;
                case -1:  this.statMod = 0.66; break;
                case -2:  this.statMod = 0.5; break;
                case -3:  this.statMod = 0.4; break;
                case -4:  this.statMod = 0.33; break;
                case -5:  this.statMod = 0.28; break;
                case -6:  this.statMod = 0.25; break;
            }
            console.log("Stage: " + this.stage);
            console.log("Modifier: " + this.statMod);
            return true;
        }else{
            console.log("This stat cannot go any lower!");
            return false;
        }
    }
}

