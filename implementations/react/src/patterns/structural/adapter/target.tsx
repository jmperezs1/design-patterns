import type { User } from "./interfaces/user";

/**
 * Interfaz objetivo que define el método esperado por el cliente.
 */
export interface Target {
    request(): Promise<User[]>;
}