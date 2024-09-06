import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit{
  time=new Date()
  intervalId:any
constructor(private router:Router){}
ngOnInit(): void {
  this.intervalId = setInterval(() => {

    this.time = new Date();

  }, 1000);
 
}

}
