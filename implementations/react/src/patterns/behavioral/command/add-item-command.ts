import type { Command } from "./command-interface";
import type { Receiver } from "./receiver";

/**
 * Comando concreto para agregar un ítem en el patrón Command.
 */

export class AddItemCommand implements Command {
    private device: Receiver;

    constructor(device: Receiver){
        this.device = device;
    }

    /** Ejecuta el comando para agregar un ítem */
    execute(item: string) {
        this.device.addItem(item);
    }
}