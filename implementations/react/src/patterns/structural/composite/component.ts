/**
 * Interfaz que define el comportamiento común para los componentes en una estructura JSON.
 */

export interface JsonComponent {
  keyLabel: string;               
  isLeaf(): boolean;               
  getPreview(): string;           
  getChildren(): JsonComponent[];  
}
