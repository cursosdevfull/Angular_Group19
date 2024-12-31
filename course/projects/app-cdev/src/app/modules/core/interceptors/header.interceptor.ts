import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const token = sessionStorage.getItem('accessToken');
  const clone = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(clone);
};
