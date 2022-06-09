import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      params: request.params.append('api_key', environment.apiKey)
    });
    return next.handle(clonedRequest);
  };
}