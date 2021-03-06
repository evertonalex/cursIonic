import { CartService } from './domain/cart.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient,
        public storage: StorageService, 
        public cartservice: CartService){

    }

    authenticate(creds: CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,{
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},{
                observe: 'response',
                responseType: 'text'
            });
    }

    sucessfullLogin(authorizationValue: string){
        let tok = authorizationValue.substring(7);
        let user:LocalUser={
            token:tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocaluser(user);
        this.cartservice.createOrClearCart();
    }

    logout(){
        this.storage.setLocaluser(null);
    }
}