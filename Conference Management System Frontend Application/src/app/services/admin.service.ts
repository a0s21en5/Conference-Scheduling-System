import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../Model/Booking/booking';
import { Observable } from 'rxjs';
import { Room } from '../Model/Room/room';
import { User } from '../Model/User/user';
import { Notification } from '../Model/notification';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  ApproveRequest(clientId: any, booking: Booking) {
    return this.httpClient.put<boolean>('https://localhost:7227/api/Admin/RejectAndApprovedRequest/'+booking.requestId+'/'+clientId,booking)
  }
  
  getAllRequest(currentDate:any):Observable<Booking[]> {
    return this.httpClient.get<Booking[]>('https://localhost:7227/api/Admin/BookingSlot/'+currentDate)
  }
  searchDataByRoomIdTime(roomId: any, date: any):Observable<Booking[]> {
    return this.httpClient.get<Booking[]>('https://localhost:7227/api/Admin/BookingSlot/'+roomId+'/'+date)
  }
  searchData(date: any):Observable<Booking[]> {
    return this.httpClient.get<Booking[]>('https://localhost:7227/api/Admin/BookingSlot/'+date)
  }
  AddNotification(adminnotify: Notification):Observable<boolean> {
   return this.httpClient.post<boolean>('https://localhost:7227/api/Admin/AddNotification',adminnotify)
  }
  EditUser(user: User):Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7227/api/User/EditUser/'+user.user_Id,user)
  }
  GetUserById(id: any):Observable<User> {
    return this.httpClient.get<User>('https://localhost:7227/api/Admin/GetUserById/'+id)
  }
  DeleteUser(id: any):Observable<boolean> {
    return this.httpClient.delete<boolean>('https://localhost:7227/api/Admin/DeleteUser/'+id)
  }
  RejectRequest(clientId:any,booking: Booking):Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7227/api/Admin/RejectAndApprovedRequest/'+booking.requestId+'/'+clientId,booking)
  }
  // ApproveRequest(booking: Booking):Observable<boolean> {
  //   return this.httpClient.put<boolean>('https://localhost:7227/api/Admin/RejectAndApprovedRequest/'+booking.requestId,booking)
  // }
  GetRequestByRequestId(requestId: any):Observable<Room> {
    return this.httpClient.get<Room>('https://localhost:7227/api/Admin/GetRequestByRequestId/'+requestId)
  }
 
  GetAllUsers():Observable<User[]> {
   return this.httpClient.get<User[]>('https://localhost:7227/api/Admin/GetAllUser')
  }
  UpdateRoomByAdmin(room: Room):Observable<boolean> {
    return this.httpClient.put<boolean>('https://localhost:7227/api/Admin/UpdateRoom/'+room.roomId,room)
  }
  GetRoomByRoomId(id: any):Observable<Room> {
    return this.httpClient.get<Room>('https://localhost:7227/api/Admin/GetRoomById/'+id)
  }
  DeleteRoom(roomId: any):Observable<boolean>{
    return this.httpClient.delete<boolean>('https://localhost:7227/api/Admin/DeleteRoom/'+roomId)
  }
  DisplayAllRoomToAdmin():Observable<Room[]> {
   return this.httpClient.get<Room[]>("https://localhost:7227/api/User/DisplayAllRoom")
  }
  CreateNewRoom(createRoom: Room):Observable<boolean> {
   return this.httpClient.post<boolean>('https://localhost:7227/api/Admin/AddRoom',createRoom)
  }
  GetAllPendingRequest():Observable<Booking[]> {
    return this.httpClient.get<Booking[]>('https://localhost:7227/api/Admin/DisplayRequestByStatus/pending')
  }
  getAllBooking(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>('https://localhost:7227/api/Admin/GetAllBooking');
  }
  constructor(private httpClient:HttpClient) { }

}
