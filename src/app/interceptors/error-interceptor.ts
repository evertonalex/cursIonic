import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController){

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
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                default:
                this.handleDefaultError(errorObj);
            }

            return Observable.throw(error);
        }) as any;
    }
    handle403(){
        this.storage.setLocaluser (null);
    }
    handle401(){
        let alert = this.alertCtrl.create({
            title:'ERRO 401: falha de autenticacao',
            message: "email ou senha incorretos!",
            enableBackdropDismiss: false,
            buttons:[
                {
                    text:'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title:'ERRO'+ errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons:[
                {
                    text:'Ok'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}