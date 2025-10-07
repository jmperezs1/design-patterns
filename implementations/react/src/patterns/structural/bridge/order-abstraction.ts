import { Report } from "./abstraction";
import type { Exporter } from "./implementor";
import type { Order } from "./interfaces/order";
import type { ReportData } from "./interfaces/report-data";
import type { Row } from "./interfaces/row";

export class OrdersReport extends Report {
  private orders: Array<Order>;
  
  constructor(exporter: Exporter, orders: Array<Order>) {
    super(exporter);
    this.orders = orders;
  }
  
  async build(): Promise<ReportData> {
    const rows: Row[] = this.orders.map(o => ({
      id: o.id, 
      customer: o.customer, 
      total: o.total, 
      status: o.status
    }));
    return { title: "Orders Report", rows };
  }
}