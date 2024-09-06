import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loginuser } from 'src/app/Model/LoginUser/loginuser';
import { User } from 'src/app/Model/User/user';
import { EncryptdecryptService } from 'src/app/services/encryptdecrypt.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Loginuser
  user:User
  token?:string|null
  jsonObjectOfUser:any
  jsonObjectoftoken:any
  jsonTokenoftoken:any
  jsonUser:any
  userEmail:any
  jsonuserDetails:any  //new added 24/08/23
  JsonUserParse:any //new added 24/08/23
constructor(private userService:UserService,private router:Router,private encryptdecryptService:EncryptdecryptService){
  this.user=new User()
  this.login=new Loginuser()
}
ngOnInit(): void {
  const signUpButton: HTMLElement | null = document.getElementById('signUp');
  const signInButton: HTMLElement | null = document.getElementById('signIn');
  const container: HTMLElement | null = document.getElementById('container');


  if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
}
  
 Login() {
  // this.login.email=this.encryptdecryptService.encryptUsingAES256(this.login.email)
  this.login.password=this.encryptdecryptService.encryptUsingAES256(this.login.password)
  this.userService.Login(this.login).subscribe(result => {
      this.token=result
      this.jsonObjectoftoken = JSON.stringify(result);
      this.jsonTokenoftoken = JSON.parse(this.jsonObjectoftoken);
    // console.warn(result)
    if(this.jsonTokenoftoken["Email"] && this.jsonTokenoftoken["Token"]){
      // console.log(this.jsonTokenoftoken);
   
      let jsonObject = JSON.stringify(result);
      let jsonToken = JSON.parse(jsonObject);
      localStorage.setItem('Token', this.jsonTokenoftoken["Token"]);
      localStorage.setItem('UserEmail', jsonToken["Email"]);

      // this.userEmail=localStorage.getItem('UserEmail')
      debugger
      this.userService.GetUserByEmail(this.jsonTokenoftoken["Email"]).subscribe(res=>{
    
        debugger;
        this.jsonObjectOfUser = JSON.stringify(res);
        this.jsonUser = JSON.parse(this.jsonObjectOfUser);
        
        this.jsonuserDetails= this.encryptdecryptService.decryptUsingAES256(this.jsonUser);//new added 24/08/23
        this.JsonUserParse=JSON.parse(this.jsonuserDetails);
        let userEmail=this.JsonUserParse["Email"]
      // console.log(userEmail)

      var userrole=this.JsonUserParse["IsAdmin"]
  
      if(userrole==true){
        Swal.fire(
          'Login Admin',
          'Login Successfully',
          'success'
        )
        localStorage.setItem('Email',userEmail)
        localStorage.setItem('Role', userrole);
        this.router.navigate(['adminhomesection'])
        
      }
      else{
        Swal.fire(
          'Login User',
          'login Successfully',
          'success'
        )
        localStorage.setItem('Email',userEmail)
        this.router.navigate(['userdashboard'])
      }
      }) 

    }
    
     this.router.navigate(['login']) 
      // localStorage.setItem("Token",this.token)
      
    })
   
  }

  AddUser(){
    this.user.password=this.encryptdecryptService.encryptUsingAES256(this.user.password)
    this.userService.AddUser(this.user).subscribe(result=>{
      debugger
      // console.warn(result)
       if(result){
        // Swal.fire(
        //   'Register User',
        //   'Registered Successfully Go To Sign In',
        //   'success'
        // )
        Swal.fire({
          title: 'Registered',
          text: "You have registered successfullay",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Please confirm and go to login page !'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
          else{
            window.location.reload();
          }
        })
        //  this.router.navigate(['/login'])
       }
       
    })
    
  }
}
