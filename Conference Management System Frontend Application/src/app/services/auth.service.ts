import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/User/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
 
 

  constructor(private httpClient:HttpClient,private userService:UserService) { }
}
