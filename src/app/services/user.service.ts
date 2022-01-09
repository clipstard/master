import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { StorageService } from '@app/services/storage.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { Router } from '@angular/router';
import { NotificationInterface } from '@interfaces/notificationInterface';


@Injectable()
export class UserService {

    constructor(
        private httpService: HttpService,
        private router: Router,
    ) {
    }

    static arrayDiff(array1: NotificationInterface[], array2: NotificationInterface[]) {
        try {
            if (array1.length !== array2.length) {
                return false;
            }

            for (let i = 0; i < array1.length; i++) {
                if (array1[i].id !== array2[i].id || array1[i].read !== array2[i].read) {
                    return false;
                }
            }
        } catch (e) {
            return false;
        }

        return true;
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

    public getNotifications(): Observable<NotificationInterface[]> {
        return this.httpService.get(`notifications/${StorageService.user.id}`).pipe(pluck('hydra:member'));
    }

    public readNotification(id: number): Observable<NotificationInterface> {
        return this.httpService.put(`notifications/${id}`, {});
    }

    public getAdmin() {
        return this.httpService.get('/admin');
    }
}
