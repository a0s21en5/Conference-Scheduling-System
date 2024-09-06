import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User/user';
import { AdminService } from 'src/app/services/admin.service';
import { EncryptdecryptService } from 'src/app/services/encryptdecrypt.service';

@Component({
  selector: 'app-getalluser',
  templateUrl: './getalluser.component.html',
  styleUrls: ['./getalluser.component.css']
})
export class GetalluserComponent implements OnInit {
  users!:User[]
  user:User
  jsonObjectOfUser:any
  jsonUser:any
  jsonuserDetails:any
  JsonUserParse:any
constructor(private adminService:AdminService,private router:Router,private encryptdecryptService:EncryptdecryptService){
  this.user=new User()

}
ngOnInit(): void {
  this.GetAllUsers()
}
  GetAllUsers() {
    this.adminService.GetAllUsers().subscribe(res=>{
      this.jsonObjectOfUser = JSON.stringify(res);
      debugger
      this.jsonUser = JSON.parse(this.jsonObjectOfUser);
      
      this.jsonuserDetails= this.encryptdecryptService.decryptUsingAES256(this.jsonUser);//new added 24/08/23
      this.JsonUserParse=JSON.parse(this.jsonuserDetails);
      // for (var userDetails of this.JsonUserParse){
      //     this.user.user_Id=userDetails["User_Id"]
      //     this.user.name=userDetails["Name"]
      //     this.user.email=userDetails["Email"]
      //     this.user.password=userDetails["Password"]
      //     this.user.designation=userDetails["Designation"]
      //     this.user.isAdmin=userDetails["IsAdmin"]
      //     this.users.push(this.user)
      // }
    // this.users=this.JsonUserParse
    })
  }
}
