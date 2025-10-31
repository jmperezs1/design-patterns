export interface JsonComponent {
  keyLabel: string;               
  isLeaf(): boolean;               
  getPreview(): string;           
  getChildren(): JsonComponent[];  
}
