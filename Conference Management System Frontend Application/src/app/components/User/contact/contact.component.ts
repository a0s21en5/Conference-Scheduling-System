import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/Model/Contact/contact';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contact:Contact
constructor(private userService:UserService,private router:Router){
  this.contact=new Contact()
}
ngOnInit(): void {
  
}
AddContact(){
this.userService.AddContact(this.contact).subscribe(res=>{
  if(res){
    Swal.fire(
      'Contact',
      'Contact Successfully',
      'success'
    )
    this.router.navigate(['/userdashboard']);
  }
})
}
Cancle(){
  this.router.navigate(['/userdashboard']);
}
}
