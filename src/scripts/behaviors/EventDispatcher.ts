import Phaser from "phaser";

let instance: EventDispatcher | null = null;
class EventDispatcher extends Phaser.Events.EventEmitter {
    constructor() {
        super();       
    }

    static getInstance() {
        if (instance == null) {
            instance = new EventDispatcher();
        }
        return instance;
    }

}