import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/Model/Room/room';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.css']
})
export class CreateroomComponent implements OnInit{
createRoom:Room
constructor(private route:Router ,private adminService:AdminService){
  this.createRoom=new Room();
}
ngOnInit(): void {
}
CreateNewRoom() {

  this.adminService.CreateNewRoom(this.createRoom).subscribe(res=>{
    console.log(res);
    if(res)
    {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  })
 
  }
}
