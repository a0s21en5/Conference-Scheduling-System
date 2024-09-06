import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/Model/Room/room';
import { User } from 'src/app/Model/User/user';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-displayallroomtoadmin',
  templateUrl: './displayallroomtoadmin.component.html',
  styleUrls: ['./displayallroomtoadmin.component.css']
})
export class DisplayallroomtoadminComponent implements OnInit {
  displayAllRoom: Room[] = [];
  user:User
constructor(private adminService:AdminService,private router:Router){
  this.user=new User();
}
ngOnInit(): void {
  this.DisplayAllRoomToAdmin()
  debugger
}
  DisplayAllRoomToAdmin() {
    debugger
    this.adminService.DisplayAllRoomToAdmin().subscribe(res=>{
     
      this.displayAllRoom=res
    })
  }
  DeleteRoom(roomId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.adminService.DeleteRoom(roomId).subscribe(result => {
        console.log(result);
        if(result){
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
  
          )
          this.DisplayAllRoomToAdmin()
        }
       })
       
       
        
      }
    })
  }
}
