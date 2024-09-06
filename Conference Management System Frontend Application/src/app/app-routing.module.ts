import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { GetallpendingrequestComponent } from './components/Admin/getallpendingrequest/getallpendingrequest.component';
import { GetallbookingComponent } from './components/Admin/getallbooking/getallbooking.component';
import { CreateroomComponent } from './components/Admin/createroom/createroom.component';
import { DisplayallroomtoadminComponent } from './components/Admin/displayallroomtoadmin/displayallroomtoadmin.component';
import { UpdateroomComponent } from './components/Admin/updateroom/updateroom.component';
import { GetalluserComponent } from './components/Admin/getalluser/getalluser.component';
import { authGuard } from './Authguard/auth.guard';
import { childauthGuard } from './Authguard/childauth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { EditprofileComponent } from './components/User/editprofile/editprofile.component';
import { AboutComponent } from './components/User/about/about.component';
import { ContactComponent } from './components/User/contact/contact.component';
import { UserNotificationComponent } from './components/User/user-notification/user-notification.component';
import { BookingComponent } from './Booking/booking/booking.component';
import { CancelslotComponent } from './components/User/cancelslot/cancelslot.component';
import { NotificationComponent } from './components/Admin/notification/notification.component';
import { DeleteComponent } from './components/Admin/delete/delete.component';
import { EditComponent } from './components/Admin/edit/edit.component';
import { AdminhomesectionComponent } from './components/Admin/adminhomesection/adminhomesection.component';
import { SearchslotComponent } from './components/searchslot/searchslot.component';
import { ApproverejectstatusComponent } from './components/Admin/approverejectstatus/approverejectstatus.component';
import { TicketComponent } from './components/User/ticket/ticket.component';


const routes: Routes = [
  {path:'admindashboard',component:AdmindashboardComponent,canActivate:[authGuard]},
  {path:'displayallroom',component:DisplayallroomtoadminComponent,canActivate:[authGuard]},
  {path:'getallpendingrequest',component:GetallpendingrequestComponent,canActivate:[authGuard]},
  {path:'createroom',component:CreateroomComponent,canActivate:[authGuard]},
  {path:'getallbooking',component:GetallbookingComponent,canActivate:[authGuard]},
  {path:'displayallroom/updateroom/:roomId',component:UpdateroomComponent,canActivate:[authGuard]},
  {path:'getalluser',component:GetalluserComponent,canActivate:[authGuard]},
  {path:'delete/:user_Id',component:DeleteComponent,canActivate:[authGuard]},
  {path:'edit/:user_Id',component:EditComponent,canActivate:[authGuard]},
  {path:'adminhomesection',component:AdminhomesectionComponent,canActivate:[authGuard]},
  {path:'searchSlot',component:SearchslotComponent},
  {path:'notification',component:NotificationComponent},
  {path:'login',component:LoginComponent},
  {path:'approverejectstatus/:requestId',component:ApproverejectstatusComponent},
  // {path:'signup',component:SignupComponent},
  
  {path:'',
   children:[
  {path:'',component:HomeComponent},
  {path:'',canActivateChild:[childauthGuard],
  children:[
    {path:'userdashboard',component:UserdashboardComponent},
    {path:'logout',component:LogoutComponent},
    {path:'editprofile',component:EditprofileComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'usernotification',component:UserNotificationComponent},
    {path:'userdashboard/booking/:id',component:BookingComponent},
    {path:'cancelslot',component:CancelslotComponent},
    {path:'ticket',component:TicketComponent}
  ]
  }
]},
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
