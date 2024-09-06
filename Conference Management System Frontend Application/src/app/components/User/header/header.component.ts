import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User/user';
import { EncryptdecryptService } from 'src/app/services/encryptdecrypt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any
  userEmail?:string|null
  jsonObjectOfUser:any //28-08
  jsonUser:any
  jsonuserDetails:any
  JsonUserParse:any
constructor(private userService:UserService, private activatedRoute: ActivatedRoute, private router: Router,private encryptdecryptService:EncryptdecryptService){
  this.user=new User()
}
ngOnInit(): void {
  const email = localStorage.getItem('UserEmail')
  this.userEmail=email
    this.GetUserByEmail(email)
}
GetUserByEmail(email: string|null ) {
  this.userService.GetUserByEmail(email).subscribe(res=>{
    this.jsonObjectOfUser = JSON.stringify(res);
        this.jsonUser = JSON.parse(this.jsonObjectOfUser);
        
        this.jsonuserDetails= this.encryptdecryptService.decryptUsingAES256(this.jsonUser);//new added 24/08/23
        this.JsonUserParse=JSON.parse(this.jsonuserDetails);
this.user=this.JsonUserParse
  })
}
  Logout(){
    this.router.navigate(['/'])
    localStorage.clear()
  }
}
