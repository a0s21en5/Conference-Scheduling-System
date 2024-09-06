import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export const childauthGuard: CanActivateChildFn = (childRoute, state) => {
  let authService=inject(AuthService);
  let userService=inject(UserService);
  let router=inject(Router)
 
 
  const email=localStorage.getItem("Email") //change Email to User1Email 08
 
 

if(email){
  const userRole=localStorage.getItem("Role")
  if(email!=null || undefined)
  {
  return true;
  }
  else{
    router.navigate(['login'])
    return false
  }
}
router.navigate(['login'])
 return false;
 
};
