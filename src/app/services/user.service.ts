import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { switchMap, tap } from 'rxjs/operators';
import { StorageService } from '@app/services/storage.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { Router } from '@angular/router';


@Injectable()
export class UserService {

    constructor(
        private httpService: HttpService,
        private router: Router,
    ) {
    }

    public login(username: string, password: string): Observable<User> {
        return this.httpService.post('login_check', { username, password }, { withCredentials: false }).pipe(
            tap(({ token }) => StorageService.authToken = token),
            switchMap(() => this.getMe()),
            tap((user) => StorageService.user = user),
        );
    }

    public logout() {
        StorageService.clear();
        this.router.navigateByUrl('/login');
    }

    public getMe() {
        return this.httpService.get('me');
    }

    public getAdmin() {
        return this.httpService.get('/admin');
    }
}
