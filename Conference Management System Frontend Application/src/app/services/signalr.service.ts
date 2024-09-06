import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Booking } from '../Model/Booking/booking';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: HubConnection;
  private notificationSubject = new Subject<Booking>();
  private Msg:Booking=new Booking()

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7227/statusHub')
    .build();

  this.hubConnection.on('ReceiveNotification', (requestId: string, userId: number, roomId: number, date: string, time: string, status: string) => {
 
    const booking: Booking = {
      requestId: requestId,
      userId: userId,
      roomId: roomId,
      date: date,
      timeSlot: time,
      status: status
    };
    this.notificationSubject.next(booking);
  });

  this.hubConnection.start()
  .catch(err => console.error('Error while starting SignalR connection: ', err));
 
}

getAdminNotifications() {
  return this.notificationSubject.asObservable();
}
}
