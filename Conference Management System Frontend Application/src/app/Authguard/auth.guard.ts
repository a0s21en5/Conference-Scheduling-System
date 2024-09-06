import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';




export const authGuard: CanActivateFn = (route, state) => {
 
  let authService=inject(AuthService);
  let userService=inject(UserService);
  let router=inject(Router)
 
 
  const email=localStorage.getItem("Email") //change Email to AdminEmail 08
 
//   if(email!=null || undefined){
//    var userEmail;
//    var userrole;
//    debugger;
//     userService.GetUserByEmail(email).subscribe(res=>{
//       console.log(res)
//       let jsonObject = JSON.stringify(res)
//       let jsonName = JSON.parse(jsonObject)
      
//       userEmail=jsonName["email"]
//       console.log(userEmail)
//       userrole=jsonName["isAdmin"]
//       if(email==userEmail && userrole==true){
        
//         return true
  
//       }
//       else{
//         router.navigate(['login'])
//         return false
//       }
//     })
//   }
//   router.navigate(['login'])
//  return false 
if(email){
  const userRole=localStorage.getItem("Role")
  if(userRole=="true" && email!=null || undefined)
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
