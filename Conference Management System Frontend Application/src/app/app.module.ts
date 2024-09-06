import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GetallbookingComponent } from './components/Admin/getallbooking/getallbooking.component';
import { GetallpendingrequestComponent } from './components/Admin/getallpendingrequest/getallpendingrequest.component';
import { GetbookroombyidComponent } from './components/User/getbookroombyid/getbookroombyid.component';
import { FormsModule } from '@angular/forms';
import { CreateroomComponent } from './components/Admin/createroom/createroom.component';
import { DisplayallroomtoadminComponent } from './components/Admin/displayallroomtoadmin/displayallroomtoadmin.component';
import { UpdateroomComponent } from './components/Admin/updateroom/updateroom.component';
import { GetalluserComponent } from './components/Admin/getalluser/getalluser.component';
import { UpdateuserbyadminComponent } from './components/Admin/updateuserbyadmin/updateuserbyadmin.component';
import { ContactComponent } from './components/User/contact/contact.component';
import { FooterComponent } from './components/User/footer/footer.component';
import { HeaderComponent } from './components/User/header/header.component';
import { EditprofileComponent } from './components/User/editprofile/editprofile.component';
import { RoomsboxComponent } from './components/User/roomsbox/roomsbox.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutComponent } from './components/User/about/about.component';
import { UserNotificationComponent } from './components/User/user-notification/user-notification.component';
import { BookingComponent } from './Booking/booking/booking.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './components/Admin/notification/notification.component';
import { CancelslotComponent } from './components/User/cancelslot/cancelslot.component';
import { IntercepterService } from './services/intercepter.service';
import { EditComponent } from './components/Admin/edit/edit.component';
import { DeleteComponent } from './components/Admin/delete/delete.component';
import { AdminhomesectionComponent } from './components/Admin/adminhomesection/adminhomesection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SearchslotComponent } from './components/searchslot/searchslot.component';
import { HubConnection } from '@microsoft/signalr';
import { ApproverejectstatusComponent } from './components/Admin/approverejectstatus/approverejectstatus.component';
import { TicketComponent } from './components/User/ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    AdmindashboardComponent,
    UserdashboardComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GetallbookingComponent,
    GetallpendingrequestComponent,
    GetbookroombyidComponent,
    CreateroomComponent,
    DisplayallroomtoadminComponent,
    UpdateroomComponent,
    GetalluserComponent,
    UpdateuserbyadminComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    EditprofileComponent,
    RoomsboxComponent,
    LogoutComponent,
    AboutComponent,
    UserNotificationComponent,
    BookingComponent,
    NotificationComponent,
    CancelslotComponent,
    EditComponent,
    DeleteComponent,
    AdminhomesectionComponent,
    SearchslotComponent,
    ApproverejectstatusComponent,
    TicketComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxMaterialTimepickerModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:IntercepterService,multi:true},
    {provide:HubConnection,useFactory:BookingComponent}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
