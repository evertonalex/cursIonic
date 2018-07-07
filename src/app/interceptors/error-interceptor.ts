import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        console.log("passou pelo interceptor");
        return next.handle(req)
        .catch((error, caught)=>{

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor: ");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                this.handle403();
                break;
            }

            return Observable.throw(error);
        }) as any;
    }
    handle403(){
        this.storage.setLocaluser (null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}