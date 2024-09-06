import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/Model/Booking/booking';

import { Room } from 'src/app/Model/Room/room';
import { User } from 'src/app/Model/User/user';
import { EncryptdecryptService } from 'src/app/services/encryptdecrypt.service';

@Component({
  selector: 'app-cancelslot',
  templateUrl: './cancelslot.component.html',
  styleUrls: ['./cancelslot.component.css']
})
export class CancelslotComponent implements OnInit{
  jsonuserDetails:any
  jsonUser:any
  jsonObjectOfUser:any
  JsonUserParse:any
  user:User
  sendId?:Number
  rooms:Booking[]=[]
constructor(private http:HttpClient,private route:ActivatedRoute,private encryptdecryptService:EncryptdecryptService)
{
  this.user=new User();

}
  ngOnInit(): void {
    var email=localStorage.getItem('UserEmail')
    console.log(email);
    
    this.http.get<User>('https://localhost:7227/api/User/GetUserByEmail/'+email).subscribe(res=>{
      this.jsonObjectOfUser = JSON.stringify(res);
      this.jsonUser = JSON.parse(this.jsonObjectOfUser);
      
      this.jsonuserDetails= this.encryptdecryptService.decryptUsingAES256(this.jsonUser);//new added 24/08/23
      this.JsonUserParse=JSON.parse(this.jsonuserDetails);
      this.user=res
      console.log(res);
      
       this.sendId=this.JsonUserParse.User_Id
       this.http.get<Room[]>('https://localhost:7227/api/User/RoomNotification?userId='+this.sendId).subscribe(
    (data) => {
      this.rooms = data;
      console.log(data);
      
    },
    (error) => {
      console.error('Error fetching rooms:', error);
    }
  );
  
})
  }
  CancelRoom(id:number) {
   
    var status = 'Cancel'
    console.log(id);
    this.http.get<boolean>('https://localhost:7227/api/User/CancleRoom?bookingId='+id+'&status='+status).subscribe(res => {
      //https://localhost:7227/api/User/CancleRoom?bookingId=47&status=Cancel  
      console.log(res);
      window.location.reload();
    }
    );
    
  }
  

  
}  

