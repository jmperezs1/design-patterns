import type { Command } from "./command-interface";
import type { Receiver } from "./receiver";


export class RemoveItemCommand implements Command {
    private device: Receiver;

    constructor(device: Receiver){
        this.device = device;
    }

    execute(item: string) {
        this.device.removeItem(item);
    }
}