import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  user:User
constructor(private userService:UserService,private router:Router){
  this.user=new User()
}
ngOnInit(): void {
  
}
AddUser(){
  this.userService.AddUser(this.user).subscribe(res=>{
    if(res){
      Swal.fire(
        'User signup',
        'signup Successfully',
        'success'
      )
      this.router.navigate(['/login'])
    }
  })
}
}
