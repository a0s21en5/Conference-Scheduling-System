import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Model/Booking/booking';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-getallbooking',
  templateUrl: './getallbooking.component.html',
  styleUrls: ['./getallbooking.component.css']
})
export class GetallbookingComponent implements OnInit{
  bookings: Booking[] = [];
constructor(private adminService: AdminService){}
ngOnInit(): void {
  this.getAllBookings();
}
  getAllBookings() {
    this.adminService.getAllBooking().subscribe(res=>{
      this.bookings=res
    })
  }
}
