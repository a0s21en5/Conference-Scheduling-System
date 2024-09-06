import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Model/Booking/booking';
import { Room } from 'src/app/Model/Room/room';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getallpendingrequest',
  templateUrl: './getallpendingrequest.component.html',
  styleUrls: ['./getallpendingrequest.component.css']
})
export class GetallpendingrequestComponent implements OnInit {
  allPendingRequest?:Booking[]
  clientId:any
  room:Room
booking:Booking
jsonObjectofRequest:any
jsonRequestofRequest:any
constructor(private adminService:AdminService){
  this.room=new Room()
  this.booking=new Booking()
}
ngOnInit(): void {
  this.GetAllPendingRequest()
}
GetAllPendingRequest() {
  this.adminService.GetAllPendingRequest().subscribe(res=>{
  this.allPendingRequest=res
  })
}
ApproveRequest(requestId:any){
  // Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You want  to approve this!",
  //   icon: 'warning',
  
  //   showCancelButton: true,
  //   confirmButtonColor: '#0b6623',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, Approve it!',
  // }).then((result) => {
  //   if (result.isConfirmed) {
      
  //     this.adminService.GetRequestByRequestId(requestId).subscribe(res=>{
  //       this.booking=res
  //       if(res){
          
  //         // this.jsonObjectofRequest = JSON.stringify(res);
  //         // this.jsonRequestofRequest = JSON.parse(this.jsonObjectofRequest);
  //         // debugger;
  //         // this.booking.bookingId=this.jsonRequestofRequest["requestId"]
  //         // this.booking.requestId=this.
  //         this.booking.status='Approved'
  //         debugger;
  //         if(this.clientId !=null && this.clientId !=undefined && this.clientId !=""){
  //           this.adminService.ApproveRequest(this.clientId,this.booking).subscribe(res=>{
  //             if(res){
  //               Swal.fire(
  //                 'Request Approved',
  //                 'Approved Successfully',
  //                 'success'
  //               )
  //               this.GetAllPendingRequest()
  //             }
  //             else{
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Oops...',
  //                 text: 'Something went wrong!',
  //                 footer: '<a href="">Why do I have this issue?</a>'
  //               })
  //             }
  //           })
  //         }
  //         else{
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: 'Please Enter Client Id',
  //           })
  //         }
         
  //       }
        
  //     })
  //   }})
 

}
RejectRequest(requestId:any){
  // Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, Reject it!'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     this.adminService.GetRequestByRequestId(requestId).subscribe(res=>{
  //       this.booking=res
  //       if(res){
  //         this.booking.status="Reject"
  //         this.adminService.RejectRequest(this.booking).subscribe(res=>{
            
  //           if(res){
  //             Swal.fire(
  //               'Request Rejected',
  //               'Rejected Successfully',
  //               'success'
  //             )
  //             this.GetAllPendingRequest()
  //           }
           
  //         })
  //       }
        
  //     })
  //   }
  // })
  
  
}
}

  