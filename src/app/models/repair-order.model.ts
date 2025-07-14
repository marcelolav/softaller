export interface RepairOrder {
  id?: string;
  clientId: string;
  clientName: string;
  equipmentDetails: string;
  issueDescription: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}