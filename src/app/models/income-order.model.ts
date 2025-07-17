export interface IncomeOrder {
  id?: string;
  productId: string;
  productName: string;
  quantityIncome: number;
  purchasePrice: number;
  createdAt: Date;
  updatedAt: Date;
}