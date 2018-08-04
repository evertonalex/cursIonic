import { ImageUtilService } from './../image-util.service';
import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ClienteService{
    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imageutilService: ImageUtilService){

    }

    findByEmail(email:string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    findById(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    getImageFromBucket(id: string):Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,{
                observe:'response',
                responseType: 'text'
            }
        )
    }

    uploadPicture(picute){
        let pictureBlog = this.imageutilService.dataUriToBlob(picute);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlog, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe:'response',
                responseType: 'text'
            }
        );
    }
}