import type { Adaptee } from "./adaptee";
import type { User } from "./interfaces/user";
import type { Target } from "./target";

/**
 * Clase adaptadora que convierte la interfaz de Adaptee a la interfaz Target.
 */

export class Adapter implements Target {

    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }

    /**
     * Convierte la respuesta CSV de Adaptee a un array de objetos User.
     */
    async request(): Promise<User[]> {
        const csv = await this.adaptee.specificRequest();
        const lines = csv.trim().split(/\r?\n/);
        const rows = lines.slice(1).filter(Boolean);   

        return rows.map((row) => {
        const [id, name, email] = row.split(",");
        return { id: Number(id), name: name?.trim(), email: email?.trim() } as User;
        });
    }

}