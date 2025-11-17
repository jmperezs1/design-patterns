import type { Command } from "./command-interface";
import type { Receiver } from "./receiver";

/**
 * Comando concreto para limpiar todos los ítems en el patrón Command.
 */

export class ClearItemsCommand implements Command {
    private device: Receiver;

    constructor(device: Receiver){
        this.device = device;
    }

    /** Ejecuta el comando para limpiar todos los ítems */
    execute() {
        this.device.clearItems();
    }
}
