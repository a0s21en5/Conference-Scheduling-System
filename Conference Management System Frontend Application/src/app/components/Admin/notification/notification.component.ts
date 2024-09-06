import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Booking } from 'src/app/Model/Booking/booking';
import { Room } from 'src/app/Model/Room/room';
import { User } from 'src/app/Model/User/user';
import { Msgbooking } from 'src/app/Model/msgbookings/msgbooking';
import { Notification } from 'src/app/Model/notification';
import { AdminService } from 'src/app/services/admin.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
//   userName: any
//   userEmail: any
//   userRoomName: any
//   BookUserId: any
  
//   //   notifications!: Booking
//   //   msg!:string
//   //   msgarr:string[]=[]
//   //   userId:string=''
//   //   message:string=''
//   // constructor(private signalRService: SignalrService)
//   // {  

//   // }
//   //   ngOnInit(): void {
//   //   this.signalRService.getAdminNotifications().subscribe((booking: Booking) => {
//   //     this.notifications=booking
//   //     this.msg=booking.requestId + 'Request For this RoomId-' + booking.roomId + 'UserId-'+ booking.userId+'Date-'+booking.date + 'Time Slot'+ booking.timeSlot
//   //     this.msgarr.push(this.msg)
//   //     // Handle the received notification as needed

//   //   });

//   //   }
//   // sendNotification(): void {

//   //     this.adminservice.sendNotificationToUser('22', 'hello');
//   //     debugger
//   //     // Optionally, you can clear the input fields after sending the notification

//   // }



//   booked: Booking

//   msg!: string

//   msgarr: string[] = []

//   userId: string = ''

//   message: string = ''

//   user: User

//   adminnotify: Notification

//   room: Room

//   notification: any
//   newNotification: any
//   // msgbooking:Msgbooking //by mohit new
//   // allmsgbooking?:Msgbooking[]//by Mohit new

//   constructor(private signalRService: SignalrService, private http: HttpClient, private adminService: AdminService) {

//     this.user = new User();
// this.booked=new Booking();
//     this.adminnotify = new Notification()

//     this.room = new Room()
//     // this.msgbooking=new Msgbooking()

//   }
//   //old notification
//   ngOnInit(): void {

//     this.func1()
//     // this.getUser()
//     // this.getRoom()
//     // this.addNotification()
//     this.http.get('https://localhost:7227/api/Admin/GetAllNotification').subscribe(res => {

//       this.notification = res

//       // console.log(res);

//     })



//   }

//   // sendNotification(): void {



//   //     this.adminservice.sendNotificationToUser('22', 'hello');

//   //     debugger

//   //     // Optionally, you can clear the input fields after sending the notification



//   // }


// getUser(){
//   this.http.get<User>('https://localhost:7227/api/Admin/GetUserById/' + this.booked.userId).subscribe(res => {
// debugger
//   //  if(res){
//   //   console.log(res);
//   //   this.user=res
//   //   debugger
//   //  }
//   let jsonObject = JSON.stringify(res);
//   let jsonObjectUser = JSON.parse(jsonObject);
//   this.BookUserId = jsonObjectUser["user_Id"]
//   this.userName = jsonObjectUser["name"]
//   this.userEmail = jsonObjectUser["email"]

//   //this.user = res

//   // this.adminnotify.userName = this.user.name

//   // this.adminnotify.email = this.user.email


// })
// }
// getRoom(){
//   this.http.get('https://localhost:7227/api/Admin/GetRoomById/' + this.booked.roomId).subscribe(res => {

//   // console.log(res);

//   // this.room = res
//   let jsonObject = JSON.stringify(res);
//   let jsonObjectRoom = JSON.parse(jsonObject);
//   this.userRoomName = jsonObjectRoom["roomName"]
//   //this.adminnotify.roomName = this.room.roomName

// })
// }
// addNotification(){
//   this.adminnotify.userId = this.BookUserId
//   this.adminnotify.userName = this.userName
//   this.adminnotify.email = this.userEmail
//   this.adminnotify.roomName = this.userRoomName
//   this.adminnotify.date = this.booked.date

//   this.adminnotify.timeSlot = this.booked.timeSlot

//   this.adminnotify.notificationData = new Date().toDateString()
  
//   // this.msg=booking.requestId + 'Request For this RoomId-' + booking.roomId + 'UserName-'+ this.user.name+'Date-'+booking.date + 'Time Slot'+ booking.timeSlot
//   this.msg = this.booked.requestId + 'Request For this RoomId-' + this.booked.roomId + 'UserName-' + this.adminnotify.userName + 'Date-' + this.booked.date + 'Time Slot' + this.booked.timeSlot
//   console.log(this.adminnotify);

//   this.msgarr.push(this.msg)
//   this.adminService.AddNotification(this.adminnotify).subscribe(res => {
    
//     console.log(res)
//   })
// }

//   //new notification
//   func1() {

//     this.signalRService.getAdminNotifications().subscribe((booking: Booking) => {
//       this.booked = booking
     
//       // this.adminnotify.userId = booking.userId
//       this.http.get<User>('https://localhost:7227/api/Admin/GetUserById/' + this.booked.userId).subscribe(res => {
// debugger
//     //  if(res){
//     //   console.log(res);
//     //   this.user=res
//     //   debugger
//     //  }
//     let jsonObject = JSON.stringify(res);
//     let jsonObjectUser = JSON.parse(jsonObject);
//     this.BookUserId = jsonObjectUser["user_Id"]
//     this.userName = jsonObjectUser["name"]
//     this.userEmail = jsonObjectUser["email"]
  
//     //this.user = res
  
//     // this.adminnotify.userName = this.user.name
  
//     // this.adminnotify.email = this.user.email
  
  
//   })
//   this.http.get('https://localhost:7227/api/Admin/GetRoomById/' + this.booked.roomId).subscribe(res => {

//   // console.log(res);

//   // this.room = res
//   let jsonObject = JSON.stringify(res);
//   let jsonObjectRoom = JSON.parse(jsonObject);
//   this.userRoomName = jsonObjectRoom["roomName"]
//   //this.adminnotify.roomName = this.room.roomName
//   this.adminnotify.userId = this.BookUserId
//   this.adminnotify.userName = this.userName
//   this.adminnotify.email = this.userEmail
//   this.adminnotify.roomName = this.userRoomName
//   this.adminnotify.date = this.booked.date
  
//   this.adminnotify.timeSlot = this.booked.timeSlot
  
//   this.adminnotify.notificationData = new Date().toDateString()
 
//   // this.msg=booking.requestId + 'Request For this RoomId-' + booking.roomId + 'UserName-'+ this.user.name+'Date-'+booking.date + 'Time Slot'+ booking.timeSlot
//   this.msg = this.booked.requestId+ '  Request For this RoomId- ' + this.booked.roomId + '  UserName-' + this.adminnotify.userName + '  Date-' + this.booked.date + '  Time Slot' + this.booked.timeSlot
 
  
//   this.msgarr.push(this.msg)
//   this.adminService.AddNotification(this.adminnotify).subscribe(res => {
    
//     console.log(res)
//   }) 
      
// })
// })
    
  

//     // this.http.post('https://localhost:7227/api/Admin/AddNotification',this.adminnotify).subscribe(res=>{
//     //   // console.log(res)
//     // })
//     // this.msgarr.push(this.msg)


//   };



//   // }
userName: any
userEmail: any
userRoomName: any
BookUserId: any


booked: Booking

msg!: string

msgarr: string[] = []

userId: string = ''

message: string = ''

user: User

adminnotify: Notification

room: Room

notification: any
newNotification: any


constructor(private signalRService: SignalrService, private http: HttpClient, private adminService: AdminService) {

  this.user = new User();
this.booked=new Booking();
  this.adminnotify = new Notification()

  this.room = new Room()
 

}
//old notification
ngOnInit(): void {

  this.func1()
  this.http.get('https://localhost:7227/api/Admin/GetAllNotification').subscribe(res => {

    this.notification = res

    

  })



}

//new notification
func1() {

  this.signalRService.getAdminNotifications().subscribe((booking: Booking) => {
    this.booked = booking
   
    this.http.get<User>('https://localhost:7227/api/Admin/GetUserById/' + this.booked.userId).subscribe(res => {
debugger
  let jsonObject = JSON.stringify(res);
  let jsonObjectUser = JSON.parse(jsonObject);
  this.BookUserId = jsonObjectUser["user_Id"]
  this.userName = jsonObjectUser["name"]
  this.userEmail = jsonObjectUser["email"]


  this.http.get('https://localhost:7227/api/Admin/GetRoomById/' + this.booked.roomId).subscribe(res => {

  let jsonObject = JSON.stringify(res);
  let jsonObjectRoom = JSON.parse(jsonObject);
  this.userRoomName = jsonObjectRoom["roomName"]
  
  this.adminnotify.userId = this.BookUserId
  this.adminnotify.userName = this.userName
  this.adminnotify.email = this.userEmail
  this.adminnotify.roomName = this.userRoomName
  this.adminnotify.date = this.booked.date
  
  this.adminnotify.timeSlot = this.booked.timeSlot
  
  //this.adminnotify.notificationData = new Date().toDateString() //this for company
  this.adminnotify.notificationData = new Date().toDateString() //this for my personal
  
  this.msg = 'Request Id : '+ this.booked.requestId+ '  Request For RoomId :  ' + this.booked.roomId + '  UserName: ' + this.adminnotify.userName + '  Date : ' + this.booked.date + '  Time Slot : ' + this.booked.timeSlot
  
  
  this.msgarr.push(this.msg)
  this.adminService.AddNotification(this.adminnotify).subscribe(res => {
    
    console.log(res)
  }) 
      
  })
})

})
  
};

}
