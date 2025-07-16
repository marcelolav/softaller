export interface InventoryItem {
  id: string;
  barcode: string;
  description: string;
  quantity: number;
  unitOfMeasure: string;
  purchasePrice: number;
  sellingPrice: number;
}