/**
 * Interfaz de comando en el patrón Command.
 */
export interface Command {
    execute(item?: string) : void
}