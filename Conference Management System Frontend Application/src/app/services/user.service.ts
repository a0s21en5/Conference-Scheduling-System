import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/User/user';
import { Room } from '../Model/Room/room';
import { Loginuser } from '../Model/LoginUser/loginuser';
import { Contact } from '../Model/Contact/contact';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  EditProfile(user: User):Observable<boolean> {
    return this.httpClient.put<boolean>("https://localhost:7227/api/User/EditUser?user_Id=" + user.user_Id, user)
  }
  AddContact(contact: Contact):Observable<boolean> {
    return this.httpClient.post<boolean>('https://localhost:7227/api/User/AddContact', contact)
  }
 
  AddUser(user: User):Observable<boolean> {
    debugger
    return this.httpClient.post<boolean>('https://localhost:7227/api/Login/AddUser',user)
  }
  Login(login: Loginuser):Observable<string> {
    return this.httpClient.post<string>('https://localhost:7227/api/Login/loginUser',login)
  }
  GetAllRooms():Observable<Room[]> {
    return this.httpClient.get<Room[]>('https://localhost:7227/api/User/DisplayAllRoom')
  }
  GetUserByEmail(email: string | null):Observable<User> {
    return this.httpClient.get<User>('https://localhost:7227/api/User/GetUserByEmail/'+email)
  }

  constructor(private httpClient:HttpClient) { }
}
