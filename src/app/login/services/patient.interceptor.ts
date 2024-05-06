import { HttpInterceptorFn } from '@angular/common/http';

export const patientInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem("loginToken");

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  
    return next(authReq);
  }
  else {
    return next(req);
  }
};
