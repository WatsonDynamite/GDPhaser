import { MonsterTemplate } from "./monsterTemplate";

export class Team
    {
        name: string;
        monsters: MonsterTemplate[];

        public Team (name: string, monsters: MonsterTemplate[] ) {
            this.name = name;
            this.monsters = monsters;
        }
    }