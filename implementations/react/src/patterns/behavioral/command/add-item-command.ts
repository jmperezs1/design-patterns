import type { Command } from "./command-interface";
import type { Receiver } from "./receiver";

export class AddItemCommand implements Command {
    private device: Receiver;

    constructor(device: Receiver){
        this.device = device;
    }

    execute(item: string) {
        this.device.addItem(item);
    }
}