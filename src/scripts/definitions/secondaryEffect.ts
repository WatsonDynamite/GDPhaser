import { SecondaryEffectEffect, SecondaryEffectType } from "./enums";

/** 
 secondary effects are a union of an effect (defense down, speed up, etc.) and the effect type (whether it affects the user or someone else)
**/
export class SecondaryEffect {

    effect: SecondaryEffectEffect;
    effectType: SecondaryEffectType;

    constructor(effectType: SecondaryEffectType, effect: SecondaryEffectEffect ){
        this.effect = effect;
        this.effectType = effectType
    }

}

//public static class SecondaryEffectList{  //used for global access of every secondary effect
//
//    public static SecondaryEffect effectHeal {get;}
//    public static SecondaryEffect effectDefDown {get;}
//    public static SecondaryEffect effectSpeedUp {get;}
//    public static SecondaryEffect poisonFive {get;}
//    public static SecondaryEffect burnFive {get;}
//
//    static SecondaryEffectList(){
//        effectHeal = new SecondaryEffect("SELF", "HEALING_HALF"); //Heals self for 50%
//        effectDefDown = new SecondaryEffect("OTHER", "LOWER_DEF_1"); //Lowers enemy's defense by 1 stage
//        effectSpeedUp = new SecondaryEffect("SELF", "BOOST_SPEED_1"); //Boosts own speed by 1 stage
//        poisonFive = new SecondaryEffect("OTHER", "POISON_FIVE"); //Poisons enemy for 5 turns
//        burnFive = new SecondaryEffect("OTHER", "BURN_FIVE"); //Burns enemy for 5 turns
//    }
//}

//public class MoveExecutionAuxUnit{ 
//    //this will mostly be used for an eventual implementation of doubles. Meant to be used when a move is invoked so that we can know who is the user, the move that was used, and the target of said move.
//    public Monster user {get;}
//    public Monster target {get;}
//    public Move move {get;}
//
//    public MoveExecutionAuxUnit(Monster usr, Monster trgt, Move mv){
//        user = usr;
//        target = trgt;
//        move = mv;
//    }
//
//}