import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Model/Room/room';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-roomsbox',
  templateUrl: './roomsbox.component.html',
  styleUrls: ['./roomsbox.component.css']
})
export class RoomsboxComponent implements OnInit {
  displayAllRoom: Room[] = [];
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.userService.GetAllRooms().subscribe(res=>{
      this.displayAllRoom = res;
    })
  }
}
