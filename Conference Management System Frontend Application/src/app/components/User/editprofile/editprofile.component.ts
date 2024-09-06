import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  user:User
constructor(private userService:UserService,private router:Router){
  this.user=new User()
}
ngOnInit(): void {
  const email = localStorage.getItem('UserEmail')
  this.GetUserByEmail(email)
}
  GetUserByEmail(email: string | null) {
    this.userService.GetUserByEmail(email).subscribe(res=>{
      this.user=res
    })
  }
Editprofile(){
this.userService.EditProfile(this.user).subscribe(res=>{
  if (res == true) {
    Swal.fire(
      'Edit Profile',
      'Edit Successfully',
      'success'
    )
    this.router.navigate(['/userdashboard'])
  }
})
}
Cancel(){
  this.router.navigate(['/userdashboard'])
}
}
