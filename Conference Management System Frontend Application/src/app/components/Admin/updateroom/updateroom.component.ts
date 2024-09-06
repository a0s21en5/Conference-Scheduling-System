import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/Model/Room/room';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-updateroom',
  templateUrl: './updateroom.component.html',
  styleUrls: ['./updateroom.component.css']
})
export class UpdateroomComponent implements OnInit {
  
  room:Room
  id:any
constructor(private activatedRoute:ActivatedRoute,private router:Router,private adminService:AdminService){
  this.room=new Room()
  this.id=this.activatedRoute.snapshot.paramMap.get('roomId')
  this.adminService.GetRoomByRoomId(this.id).subscribe(res=>{
    this.room=res
  })
}
ngOnInit(): void {
  
}
UpdateRoom(){
  this.adminService.UpdateRoomByAdmin(this.room).subscribe(res=>{
    if(res){
      this.router.navigate(['displayallroom'])
    }
    
  })
}
Cancel(){
  this.router.navigate(['displayallroom'])
}
}
