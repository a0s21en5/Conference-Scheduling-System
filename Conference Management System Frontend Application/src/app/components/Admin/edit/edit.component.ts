import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User/user';
import { AdminService } from 'src/app/services/admin.service';
import { EncryptdecryptService } from 'src/app/services/encryptdecrypt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  user:User
  id:any
constructor(private router:Router,private adminService:AdminService,private activatedRoute:ActivatedRoute,private encryptedDecrypted:EncryptdecryptService){
  this.user=new User()
}
ngOnInit(): void {
  this.user.password=this.encryptedDecrypted.encryptUsingAES256(this.user.password)
  this.id=this.activatedRoute.snapshot.paramMap.get('user_Id')
  this.adminService.GetUserById(this.id).subscribe(res=>{
    debugger;
    this.user=res
  })
}
EditUser(){
  
  this.adminService.EditUser(this.user).subscribe(res=>{
    if(res){
      Swal.fire(
        'User Updated',
        'Updated Successfully',
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
