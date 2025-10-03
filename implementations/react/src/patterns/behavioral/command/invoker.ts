import type { Command } from "./command-interface";


export class Invoker {
    private command : Command;

    constructor(command: Command){
        this.command = command;
    }

    setCommand(command: Command){
        this.command = command;
    }

    executeCommand(item?: string){
        this.command.execute(item);
    }
}