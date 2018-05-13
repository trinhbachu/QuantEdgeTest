import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService{
    private domainURL = '/api/';
    private firstLoadCtrl = 'first-load';
    private gainersLoadCtrl = 'gainers-load';
    private losersLoadCtrl = 'losers-load';
    
    constructor(private httpClient: HttpClient){}
    firstLoad():Promise<any>{
        return this.httpClient.get(this.domainURL + this.firstLoadCtrl).toPromise();
    }
    gainersLoad():Promise<any>{
        return this.httpClient.get(this.domainURL + this.gainersLoadCtrl).toPromise();
    }
    losersLoad():Promise<any>{
        return this.httpClient.get(this.domainURL + this.losersLoadCtrl).toPromise();
    }
}