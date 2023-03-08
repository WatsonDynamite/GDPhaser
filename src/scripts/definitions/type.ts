//this file defines all the types in the game that both monsters and moves have.

export enum Type
{
    NONE, //default type for empty secondary types / error handling, make sure NULL is never used for a type. Use this instead.)
    WATER,
    FIRE,
    NATURE,
    ICE,
    ELECTRIC,
    TOXIC,
    SHADOW,
    MIND,
    LIGHT,
    MARTIAL,
    EARTH,
    METAL,
    WIND,
    ARCANE,
}

export const typeChart = [
/*NONE*/[/*NON*/1,  /*WTR*/1,  /*FIR*/1,   /*NTR*/1,   /*ICE*/1,   /*ELC*/1,   /*TOX*/1,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/1,   /*MTL*/1,   /*WND*/1,   /*ARC*/1],
/*WATR*/[/*NON*/1,  /*WTR*/0.5,/*FIR*/2,   /*NTR*/0.5, /*ICE*/0.5, /*ELC*/2,   /*TOX*/2,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/2,   /*MTL*/1,   /*WND*/1,   /*ARC*/1],
/*FIRE*/[/*NON*/1,  /*WTR*/0.5,/*FIR*/0.5, /*NTR*/2,   /*ICE*/2,   /*ELC*/1,   /*TOX*/2,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/1,   /*MTL*/2,   /*WND*/1,   /*ARC*/1],
/*NATR*/[/*NON*/1,  /*WTR*/2,  /*FIR*/0.5, /*NTR*/0.5, /*ICE*/1,   /*ELC*/1,   /*TOX*/0.5, /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/2,   /*MTL*/0.5, /*WND*/0.5, /*ARC*/1],
/*ICE */[/*NON*/1,  /*WTR*/0.5,/*FIR*/2,   /*NTR*/2,   /*ICE*/0.5, /*ELC*/1,   /*TOX*/1,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/0,   /*MTL*/2,   /*WND*/2,   /*ARC*/1],
/*ELEC*/[/*NON*/1,  /*WTR*/2,  /*FIR*/1,   /*NTR*/0.5, /*ICE*/1,   /*ELC*/0,   /*TOX*/1,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/0,   /*MTL*/2,   /*WND*/2,   /*ARC*/1],
/*TOX */[/*NON*/1,  /*WTR*/2,  /*FIR*/1,   /*NTR*/2 ,  /*ICE*/1,   /*ELC*/1,   /*TOX*/0,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/1,   /*MTL*/0,   /*WND*/1,   /*ARC*/1],
/*SHDW*/[/*NON*/1,  /*WTR*/1,  /*FIR*/1,   /*NTR*/1,   /*ICE*/1,   /*ELC*/1,   /*TOX*/0.5, /*SHD*/0.5, /*MND*/2,   /*LGT*/2,   /*ERT*/1,   /*MTL*/1,   /*WND*/1,   /*ARC*/0.5],
/*MIND*/[/*NON*/1,  /*WTR*/1,  /*FIR*/1,   /*NTR*/1,   /*ICE*/1,   /*ELC*/1,   /*TOX*/2,   /*SHD*/0.5, /*MND*/1,   /*LGT*/1,   /*ERT*/1,   /*MTL*/1,   /*WND*/1,   /*ARC*/1],
/*LIGH*/[/*NON*/1,  /*WTR*/1,  /*FIR*/0.5, /*NTR*/1,   /*ICE*/2,   /*ELC*/1,   /*TOX*/1,   /*SHD*/2,   /*MND*/1,   /*LGT*/1,   /*ERT*/1,   /*MTL*/0.5, /*WND*/1,   /*ARC*/0.5],
/*ERTH*/[/*NON*/1,  /*WTR*/2,  /*FIR*/1,   /*NTR*/1,   /*ICE*/2,   /*ELC*/2,   /*TOX*/1,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/1,   /*MTL*/2,   /*WND*/0,   /*ARC*/1],
/*METL*/[/*NON*/1,  /*WTR*/0.5,/*FIR*/0.5, /*NTR*/1,   /*ICE*/2,   /*ELC*/0.5, /*TOX*/1,   /*SHD*/1,   /*MND*/1,   /*LGT*/2,   /*ERT*/1,   /*MTL*/0.5, /*WND*/1,   /*ARC*/2],
/*WIND*/[/*NON*/1,  /*WTR*/1,  /*FIR*/2,   /*NTR*/2,   /*ICE*/1,   /*ELC*/1,   /*TOX*/1,   /*SHD*/1,   /*MND*/1,   /*LGT*/1,   /*ERT*/1,   /*MTL*/2,   /*WND*/0.5, /*ARC*/1],
/*ARCN*/[/*NON*/1,  /*WTR*/1,  /*FIR*/1,   /*NTR*/1,   /*ICE*/1,   /*ELC*/1,   /*TOX*/1,   /*SHD*/2,   /*MND*/1,   /*LGT*/0.5, /*ERT*/1,   /*MTL*/0.5, /*WND*/1,   /*ARC*/2]
]

export function effectiveness(attackType: number, defendType: number){ //receives two types, and returns the effectiveness of the first type towards the second in the form of a float.
        return typeChart[attackType][defendType];
}

