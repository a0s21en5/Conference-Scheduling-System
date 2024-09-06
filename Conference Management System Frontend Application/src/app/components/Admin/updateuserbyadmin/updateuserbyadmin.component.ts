import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/User/user';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updateuserbyadmin',
  templateUrl: './updateuserbyadmin.component.html',
  styleUrls: ['./updateuserbyadmin.component.css']
})
export class UpdateuserbyadminComponent implements OnInit{
  id:any
  user:User
constructor(private adminService:AdminService,private activatedRoute:ActivatedRoute){
  this.user=new User()
}
ngOnInit(): void {
this.id=this.activatedRoute.snapshot.paramMap.get('user_Id')
  this.adminService.GetUserById(this.id).subscribe(res=>{
    this.user=res
  })
}
}
