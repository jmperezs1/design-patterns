export type Slot = { resourceId: string; start: string; end: string };
export type Customer = { name: string; email: string; phone?: string };
export type Payment = { amount: number; currency: 'USD' | 'EUR' | 'COP' };
