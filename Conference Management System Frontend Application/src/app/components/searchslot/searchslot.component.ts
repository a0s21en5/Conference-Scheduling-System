import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Model/Booking/booking';
import { AdminService } from 'src/app/services/admin.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-searchslot',
  templateUrl: './searchslot.component.html',
  styleUrls: ['./searchslot.component.css']
})
export class SearchslotComponent implements OnInit{
  date:any
  roomId:any
  nowDate:any
  currentDate:any
  bookRoom:Booking
  bookings:Booking[]=[]
constructor(private userService:UserService,private adminService:AdminService){
  this.bookRoom=new Booking()
}
ngOnInit(): void {
  this.nowDate = new Date();
  this.currentDate= new Date().toLocaleDateString('sv');
  console.log(this.currentDate)
  console.log(this.nowDate)
  this.getAllRequests()
} 
  getAllRequests() {
    this.adminService.getAllRequest(this.currentDate).subscribe(res=>{
      this.bookings=res
    })
  }
searchData(){
  debugger
  if((this.date != undefined && this.date!="" ) && (this.roomId==undefined || this.roomId==null ||this.roomId=="")){
    this.adminService.searchData(this.date).subscribe(res=>{
      console.log("Search Data by date",res)
      this.bookings=res
    })
  }
  else if((this.date!=undefined && this.date!="" ) && (this.roomId!=undefined && this.roomId!="" )){
    this.adminService.searchDataByRoomIdTime(this.roomId,this.date).subscribe(res=>{
      console.log("Search Data by date and time",res)
      this.bookings=res
    })
  }
  else if((this.currentDate==undefined || this.currentDate=="" )&&(this.date==undefined || this.date=="" ) && (this.roomId==undefined || this.roomId=="" )){
this.adminService.getAllRequest(this.currentDate).subscribe(res=>{
  
})
  }
  else{
    this.adminService.getAllRequest(this.currentDate).subscribe(res=>{
      this.bookings=res
      console.log(this.bookings);
      
    })
  }
  
}
}
