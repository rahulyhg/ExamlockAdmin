import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);   
    private userData = { usertype: '', username: '', hide: '' };
    get isLoggedIn() {
        let loginuserData = localStorage.getItem('users');
        if (loginuserData !== null) {
            this.loggedIn.next(true);
            return this.loggedIn.asObservable();
        }
        this.loggedIn.next(false); 
        return this.loggedIn.asObservable();
    }

    constructor(private router: Router, private http: Http) { }

    login(user: User) {

        if (user.username != '' && user.password != '') {
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this.http.post('http://tachetechnologies.com/ExamlockApi/examConsole/api/v1/login',
           JSON.stringify(user),
              { headers: headers }).map((res:Response)=>{
                    const data = res.json();
                    if(data.errorMessage){
                        this.loggedIn.next(false);
                    }else{
                        this.loggedIn.next(true);
                    }
                    return data;
              });                   

        }

    }

    logout() {
        this.loggedIn.next(false);
        localStorage.setItem('users', '');
        localStorage.setItem('subscriptions', null);
        localStorage.setItem('clients', null);
        this.router.navigate(['/login']);
    }
}