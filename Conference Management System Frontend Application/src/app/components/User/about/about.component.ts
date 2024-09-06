import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  href:any
  constructor(private router:Router){}
  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href)
  }
}
