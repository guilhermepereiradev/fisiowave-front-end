import { HttpInterceptorFn } from '@angular/common/http';

export const patientInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem("loginToken");

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};
