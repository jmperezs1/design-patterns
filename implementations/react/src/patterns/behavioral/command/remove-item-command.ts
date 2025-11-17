import type { Command } from "./command-interface";
import type { Receiver } from "./receiver";

/**
 * Comando concreto para eliminar un ítem en el patrón Command.
 */
export class RemoveItemCommand implements Command {
    private device: Receiver;

    constructor(device: Receiver){
        this.device = device;
    }

    execute(item: string) {
        this.device.removeItem(item);
    }
}