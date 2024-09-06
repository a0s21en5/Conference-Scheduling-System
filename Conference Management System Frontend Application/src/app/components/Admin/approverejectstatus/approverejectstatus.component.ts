import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/Model/Booking/booking';
import { Room } from 'src/app/Model/Room/room';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approverejectstatus',
  templateUrl: './approverejectstatus.component.html',
  styleUrls: ['./approverejectstatus.component.css']
})
export class ApproverejectstatusComponent implements OnInit {
  booking:Booking
  room:Room
  connectionId:any
  requestId:any
  selectedStatus:any
  Selectlanguage:any
  Status: string[] = [
    'Approved',
    'Rejected',
    
  ];
  
  constructor(private userService:UserService, private adminService:AdminService,private activatedRoute:ActivatedRoute,private router:Router){
   this.booking=new Booking()
   this.room=new Room()

  }
  ngOnInit(): void {
    debugger
    console.log(this.Selectlanguage)

    this.requestId=this.activatedRoute.snapshot.paramMap.get('requestId');
    this.getUserBookingDetailsByStatus()
  }
 
  value(){
    debugger
    console.log(this.selectedStatus)
    console.log(this.requestId) 
    if(this.selectedStatus=="Approved"){
      Swal.fire({
        title: 'Are you sure?',
        text: "You want  to approve this!",
        icon: 'warning',
      
        showCancelButton: true,
        confirmButtonColor: '#0b6623',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve it!',
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.adminService.GetRequestByRequestId(this.requestId).subscribe(res=>{
            this.booking=res
            if(res){
              
              // this.jsonObjectofRequest = JSON.stringify(res);
              // this.jsonRequestofRequest = JSON.parse(this.jsonObjectofRequest);
              // debugger;
              // this.booking.bookingId=this.jsonRequestofRequest["requestId"]
              // this.booking.requestId=this.
              this.booking.status='Approved'
              debugger;
              if(this.connectionId !=null && this.connectionId !=undefined && this.connectionId !=""){
                this.adminService.ApproveRequest(this.connectionId,this.booking).subscribe(res=>{
                  if(res){
                    Swal.fire(
                      'Request Approved',
                      'Approved Successfully',
                      'success'
                    )
                    this.router.navigate(['getallpendingrequest']);
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
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please Enter Client Id',
                })
              }
             
            }
            
          })
         }})
    }
   else{
     Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Reject it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.adminService.GetRequestByRequestId(this.requestId).subscribe(res=>{
        this.booking=res
        if(res){
          this.booking.status="Reject"
          this.adminService.RejectRequest(this.connectionId,this.booking).subscribe(res=>{
            
            if(res){
              Swal.fire(
                'Request Rejected',
                'Rejected Successfully',
                'success'
              )
              this.router.navigate(['getallpendingrequest']);
            }
           
          })
        }
        
      })
    }
  })
  
   }
  }
  selectedChanged(){
    console.log(this.selectedStatus)
  }

  getUserBookingDetailsByStatus() {
    this.adminService.GetRequestByRequestId(this.requestId).subscribe(res=>{

    })
  }
}
