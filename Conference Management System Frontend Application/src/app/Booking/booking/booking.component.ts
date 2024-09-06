import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import format from 'date-fns/format';

import { Booking } from 'src/app/Model/Booking/booking';
import { Room } from 'src/app/Model/Room/room';
import { User } from 'src/app/Model/User/user';
import { EncryptdecryptService } from 'src/app/services/encryptdecrypt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  jsonObjectOfUser:any
  jsonuserDetails:any
  JsonUserParse:any
  jsonUser:any
  selectedStartTime:any
  selectedEndTime:any
  selectedTotalTime:any
  // selectedTotalTime:any
  user: User=new User;
  room:Room=new Room();
  id:string|undefined|null
  booking:Booking 
  convertedDate: Date=new Date;

  @Input() timeSlots?: string

  @Output() selectedTime: EventEmitter<string> = new EventEmitter<string>();

 

  onSelectTime(time: string) {

    this.selectedTime.emit(time);

}

  minDate = new Date();

 
  private hubConnection!:HubConnection 
  selectedDate!: Date  // Initialize the variable to null
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router,private encryptdecryptService:EncryptdecryptService)
  {
   this.booking=new Booking()
   this.booking.requestId=''
   this.booking.status=''
  }
  ngOnInit(): void {
    this.hubConnection=new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7227/statusHub',{
      skipNegotiation:true,
      transport:signalR.HttpTransportType.WebSockets
    }).build();

    this.hubConnection.start().then(() => {
      console.log('connection started');
    }).catch(err => console.log(err));
    this.hubConnection.on('ReceiveSpecificNotification', (data) => {
      debugger;
      console.log('client Id:' + data);
      //this.hubConnection.invoke('GetDataFromClient', 'abc@abc.com', data).catch(err => console.log(err));
    });
    this.hubConnection.on('privateMessageMethodName', (data) => {
      debugger;
      if(data=="Your request has been approved"){
        console.log('private Approved Message:' + data);
        localStorage.setItem('BookingStatus',"Approved")
      }
      else if(data=="Your request has been Rejected"){
        console.log('private Rejected Message:' + data);
        localStorage.setItem('BookingStatus',"Rejected")
      }
      else{
        console.log('private Message:' + data);
        localStorage.setItem('BookingStatus',"Pending")
      }
      
    });
    this.id= this.route.snapshot.paramMap.get('id')

    const email = localStorage.getItem('UserEmail')
    this.GetUserByEmail(email)
    this.GetRoomById()
     
    
  }
  
  onStartTimeSelected(event: any):void {
    debugger
    this.selectedStartTime = event;
    console.log(this.selectedStartTime)
//     const formattedTime = format(this.selectedTime1, 'hh:mm a');
// console.log(formattedTime);
// this.booking.timeSlot=formattedTime
// console.log(
//   this.booking.timeSlot
// );

  }
  onEndTimeSelected(event: any):void{
    debugger
    this.selectedEndTime = event;
    console.log(this.selectedEndTime)
  }

  GetUserByEmail(email: string | null) {
    this.http.get<User>("https://localhost:7227/api/User/GetUserByEmail/" + email).subscribe(result => {
      this.jsonObjectOfUser = JSON.stringify(result);
      this.jsonUser = JSON.parse(this.jsonObjectOfUser);
      
      this.jsonuserDetails= this.encryptdecryptService.decryptUsingAES256(this.jsonUser);//new added 24/08/23
      this.JsonUserParse=JSON.parse(this.jsonuserDetails);
      //this.user =  this.JsonUserParse
      this.booking.userId=this.JsonUserParse.User_Id
      debugger
    })
  }
  GetRoomById() {
    this.http.get<Room>("https://localhost:7227/api/Admin/GetRoomById/" + this.id).subscribe(result => {

      this.room = result
      this.booking.roomId=this.room.roomId
    })
  }


  onDateSelected(event: any): void {

    this.selectedDate = event.value;
    const formattedDate = format(this.selectedDate, 'yyyy-MM-dd');
   console.log('Formatted Date:', formattedDate);
   this.booking.date=formattedDate

  }

 

// chandrakant code

timeslots = [

  { label: '10 AM - 12 PM', isSelected: false },

  { label: '12 PM - 2 PM', isSelected: false },

  { label: '2 PM - 4 PM', isSelected: false },

  { label: '4 PM - 6 PM', isSelected: false },

];

selecteTime?: string // To store the label of the selected timeslot

toggleTimeslot(timeslot: any) {

  if (timeslot.isSelected) {
 // Deselect the current timeslot

  } else {

    this.selecteTime = timeslot.label; // Select the timeslot and store its label

  }

  // Deselect all other timeslots

  this.timeslots.forEach(slot => {

    if (slot !== timeslot) {

      slot.isSelected = false;

    }

  });

  // Toggle the selected state of the clicked timeslot

  timeslot.isSelected = !timeslot.isSelected;

}

onNextButtonClicked() {
debugger
//   // Print the selected time in the console when "Next" button is clicked
//   this.selectedTotalTime=this.selectedStartTime.concat(this.selectedEndTime.toString());
//   if (this.selecteTime!=null || this.selecteTime!=undefined) {
//     debugger
//     this.booking.timeSlot = this.selecteTime;
//     //this.selectedTotalTime1=this.selectedStartTime+this.selectedEndTime
//     // this.selectedTotalTime=this.selectedStartTime.concat(this.selectedEndTime.toString());
//     // console.log(this.booking);
    

  


    
//     this.http.post<boolean>('https://localhost:7227/api/User/BookRoom',this.booking).subscribe(res=>{
     
      
//    if(res){
//     Swal.fire(

//       'Good job!',

//       'Room Booked Successfully!',

//       'success'

//     )
//     this.router.navigate(['userdashboard'])
//    }
    
//     })

//   }
//   else if(this.selectedTotalTime!=undefined && this.selecteTime==undefined){
// this.booking.timeSlot=this.selectedTotalTime

// this.http.post<boolean>('https://localhost:7227/api/User/BookRoom',this.booking).subscribe(res=>{
     
      
// if(res){
//  Swal.fire(

//    'Good job!',

//    'Room Booked Successfully!',

//    'success'

//  )
//  this.router.navigate(['userdashboard'])
// }
 
//  })
//   }
//   else {

//     console.log('Error');

//   }
 // Print the selected time in the console when "Next" button is clicked
 
 if (this.selecteTime!=null || this.selecteTime!=undefined) {
   debugger
   this.booking.timeSlot = this.selecteTime;
   //this.selectedTotalTime1=this.selectedStartTime+this.selectedEndTime
   // this.selectedTotalTime=this.selectedStartTime.concat(this.selectedEndTime.toString());
   // console.log(this.booking);
   

 


   
   this.http.post<boolean>('https://localhost:7227/api/User/BookRoom',this.booking).subscribe(res=>{
    
     
  if(res){
   Swal.fire(

     'Good job!',

     'Room Booked Successfully!',

     'success'

   )
   this.router.navigate(['ticket'])
   

  }
   
   })

 }
 else if(this.selectedTotalTime=this.selectedStartTime.concat(this.selectedEndTime.toString())){
this.booking.timeSlot=this.selectedTotalTime

this.http.post<boolean>('https://localhost:7227/api/User/BookRoom',this.booking).subscribe(res=>{
    
     
if(res){
Swal.fire(

  'Good job!',

  'Room Booked Successfully!',

  'success'

)
this.router.navigate(['ticket'])
}

})
 }
 else {

   console.log('Error');

 }

}
Cancel(){
  this.router.navigate(['userdashboard'])
}

}
