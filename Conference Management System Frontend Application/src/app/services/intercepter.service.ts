import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor{
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token=localStorage.getItem("Token")
  if (!token) {
    return next.handle(req);
  }
debugger
  const req1 = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next.handle(req1);
}
  constructor() { }
}
