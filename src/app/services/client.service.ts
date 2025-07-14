import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: Client[] = [
    { id: '1', name: 'Juan', lastName: 'Perez', address: 'Calle Falsa 123', phone: '1234567890' },
    { id: '2', name: 'Maria', lastName: 'Gomez', address: 'Avenida Siempre Viva 742', phone: '0987654321' }
  ];

  constructor() { }

  getClients(): Observable<Client[]> {
    return of(this.clients);
  }

  getClient(id: string): Observable<Client | undefined> {
    return of(this.clients.find(client => client.id === id));
  }

  addClient(client: Omit<Client, 'id'>): Observable<Client> {
    const newClient: Client = { ...client, id: this.generateId() };
    this.clients.push(newClient);
    return of(newClient);
  }

  updateClient(client: Client): Observable<Client> {
    const index = this.clients.findIndex(c => c.id === client.id);
    if (index > -1) {
      this.clients[index] = client;
    }
    return of(client);
  }

  deleteClient(id: string): Observable<void> {
    this.clients = this.clients.filter(client => client.id !== id);
    return of(undefined);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}