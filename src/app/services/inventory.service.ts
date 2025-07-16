import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  docData,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryCollection;

  constructor(private firestore: Firestore) {
    this.inventoryCollection = collection(this.firestore, 'products');
  }

  getInventoryItems(): Observable<InventoryItem[]> {
    return collectionData(this.inventoryCollection, { idField: 'id' }) as Observable<InventoryItem[]>;
  }

  getInventoryItem(id: string): Observable<InventoryItem> {
    const itemDoc = doc(this.firestore, `products/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<InventoryItem>;
  }

  async getItemByBarcode(barcode: string): Promise<InventoryItem | undefined> {
    const q = query(this.inventoryCollection, where('barcode', '==', barcode));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return undefined;
    }
    const docData = querySnapshot.docs[0].data();
    const id = querySnapshot.docs[0].id;
    return { id, ...docData } as InventoryItem;
  }

  searchItemsByBarcode(barcode: string): Observable<InventoryItem[]> {
    const q = query(
      this.inventoryCollection,
      where('barcode', '>=', barcode),
      where('barcode', '<=', barcode + '\uf8ff')
    );
    return collectionData(q, { idField: 'id' }) as Observable<InventoryItem[]>;
  }

  addInventoryItem(item: Omit<InventoryItem, 'id'>) {
    return addDoc(this.inventoryCollection, item);
  }

  updateInventoryItem(item: InventoryItem) {
    const itemDoc = doc(this.firestore, `products/${item.id}`);
    return updateDoc(itemDoc, { ...item });
  }

  deleteInventoryItem(id: string) {
    const itemDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(itemDoc);
  }
}