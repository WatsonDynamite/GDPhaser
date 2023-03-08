//this defines the structure of the moves that monsters use.

import { Category } from "./enums";
import { SecondaryEffect } from "./secondaryEffect";
import { Type } from "./type";

export class Move
{
    //the name of a move
    name: string;
    //the move's description
    desc: string;
    //how much stamina the move costs to cast
    APCost: number;
    //how much base power the move has
    power: number;
    //what type the move is
    type: Type; 
    //Category: physical, special, status, see: Category class
    cat: Category;
    //Priority: This shouldn't go lower than -4 or higher than 4 but there are no other constraints to it.
    priority: number;
    //array of special secondary effects triggered by the move
    secondaryEffects: SecondaryEffect[];

/*
    public Move(string nm, string dsc, int pow, int c, Type t, Category ct, int pri, SecondaryEffect[] scFX){
            name = nm;
            desc = dsc;
            cost = c;
            power = pow;
            type = t;
            cat = ct;
            priority = pri;
            secondaryEffects = scFX;
    }
    */
}



