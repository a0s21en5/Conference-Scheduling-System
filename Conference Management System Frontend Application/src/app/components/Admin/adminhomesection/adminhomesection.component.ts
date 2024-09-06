import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User/user';
import { EncryptdecryptService } from 'src/app/services/encryptdecrypt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminhomesection',
  templateUrl: './adminhomesection.component.html',
  styleUrls: ['./adminhomesection.component.css']
})
export class AdminhomesectionComponent implements OnInit{
  jsonObjectOfUser:any
  jsonuserDetails:any
  JsonUserParse:any
  time = new Date();
  intervalId:any;
  user:User
  jsonObjectofUser:any
  jsonUser:any
  userName?:string|null
constructor(private userService:UserService,private encryptdecryptService:EncryptdecryptService){
  this.user=new User()
}
ngOnInit(): void {
  this.intervalId = setInterval(() => {
    this.time = new Date();
  }, 1000);
  const email=localStorage.getItem("Email")
  debugger
  this.userService.GetUserByEmail(email).subscribe(res=>{
    if(res){
    
      this.jsonObjectOfUser = JSON.stringify(res);
      this.jsonUser = JSON.parse(this.jsonObjectOfUser);
      
      this.jsonuserDetails= this.encryptdecryptService.decryptUsingAES256(this.jsonUser);//new added 24/08/23
      this.JsonUserParse=JSON.parse(this.jsonuserDetails);
      this.userName=this.JsonUserParse.Name
    }
   
  })
}
}
