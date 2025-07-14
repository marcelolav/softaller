import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, CollectionReference, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RepairOrder } from '../models/repair-order.model';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private repairCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.repairCollection = collection(this.firestore, 'repairs');
  }

  getRepairs(): Observable<RepairOrder[]> {
    return collectionData(this.repairCollection, { idField: 'id' }) as Observable<RepairOrder[]>;
  }

  getRepairOrder(id: string): Observable<RepairOrder> {
    const repairDoc = doc(this.firestore, `repairs/${id}`);
    return docData(repairDoc, { idField: 'id' }) as Observable<RepairOrder>;
  }

  addRepair(repair: Omit<RepairOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<any> {
    const newRepair = {
      ...repair,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return addDoc(this.repairCollection, newRepair);
  }

  updateRepair(repair: RepairOrder): Promise<void> {
    const repairDoc = doc(this.firestore, `repairs/${repair.id}`);
    const updatedRepair = {
      ...repair,
      updatedAt: new Date()
    };
    return updateDoc(repairDoc, { ...updatedRepair });
  }

  deleteRepair(id: string): Promise<void> {
    const repairDoc = doc(this.firestore, `repairs/${id}`);
    return deleteDoc(repairDoc);
  }
}