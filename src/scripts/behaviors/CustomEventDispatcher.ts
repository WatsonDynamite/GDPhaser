import Phaser from "phaser";

let instance: CustomEventDispatcher | null = null;
export default class CustomEventDispatcher extends Phaser.Events.EventEmitter {
    constructor() {
        super();       
    }

    static getInstance() {
        if (instance == null) {
            instance = new CustomEventDispatcher();
        }
        return instance;
    }

}

export enum CustomEvents {
    INIT_CHAT_UI = 'init_chat_ui'
}