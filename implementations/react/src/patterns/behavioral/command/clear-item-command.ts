import type { Command } from "./command-interface";
import type { Receiver } from "./receiver";


export class ClearItemsCommand implements Command {
    private device: Receiver;

    constructor(device: Receiver){
        this.device = device;
    }

    execute() {
        this.device.clearItems();
    }
}
