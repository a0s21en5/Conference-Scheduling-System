import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Model/Booking/booking';
import { User } from 'src/app/Model/User/user';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit{
  notifications: Booking[] = [];
  user:User
  sendId?:Number
  constructor(private http:HttpClient) 
  { 
    this.user=new User()
  }

  ngOnInit(): void {
    // this.admintousernotification.notifications$.subscribe((message: string) => {
   
      
    //   this.notifications.push(message);
    // });
    //https://localhost:7227/api/User/GetUserByEmail/portalsuperuser%40gmail.com
    //https://localhost:7227/api/User/RoomNotification?userId=5
    var email=localStorage.getItem('UserEmail')
    // console.log(email);
    
    this.http.get<User>('https://localhost:7227/api/User/GetUserByEmail/'+email).subscribe(res=>{
      this.user=res
       this.sendId=this.user.user_Id
       this.http.get<Booking[]>('https://localhost:7227/api/User/RoomNotification?userId='+this.sendId).subscribe(res=>{

        this.notifications=res
        
      })
      
    })

   
  }

}
