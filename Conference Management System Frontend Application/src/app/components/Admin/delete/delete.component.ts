import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User/user';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  user:User
  id:any
constructor(private router:Router,private activatedRoute:ActivatedRoute,private adminService:AdminService){
  this.user=new User()
}
ngOnInit(): void {
  this.id=this.activatedRoute.snapshot.paramMap.get('user_Id')
  this.adminService.GetUserById(this.id).subscribe(res=>{
    this.user=res
  })
  
}
  DeleteUser() {
    this.adminService.DeleteUser(this.id).subscribe(res=>{
if(res){
  Swal.fire(
    'User Deleted',
    'Deleted Successfully',
    'success'
  )
  this.router.navigate(['/getalluser']);
}
    })
  }

Cancel(){
  this.router.navigate(['/getalluser']);

}
}
