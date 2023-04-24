import { Monster } from "./monster";

export class Team
    {
        name: string;
        monsters: Monster[];

        public Team (name: string, monsters: Monster[] ) {
            this.name = name;
            this.monsters = monsters;
        }
    }