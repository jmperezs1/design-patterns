import type { Command } from "./command-interface";

/**
 * Invocador en el patrón Command.
 */


export class Invoker {
    private command : Command;

    constructor(command: Command){
        this.command = command;
    }

    /** Establece el comando a ejecutar */
    setCommand(command: Command){
        this.command = command;
    }

    /** Ejecuta el comando establecido */
    executeCommand(item?: string){
        this.command.execute(item);
    }
}