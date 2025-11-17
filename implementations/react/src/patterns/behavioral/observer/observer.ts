/**
 *  Observer Interface que define el método de actualización para los observadores.
 */

export interface Observer<T> { 
    update(data: T): void; 
}