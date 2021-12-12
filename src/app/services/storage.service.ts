import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { User } from '@interfaces/user';


@Injectable()
export class StorageService {

    public static AUTH_KEY = 'auth_token';
    public static USER_KEY = 'authenticated_user';
    public static isAuthenticated: boolean;
    private static  prefix = '_master|';

    constructor(
        protected httpService: HttpService,
    ) {
    }

    private static _user: User | null;

    public static set user(user: User | null) {
        StorageService.isAuthenticated = !!user;
        StorageService._user = user;
        if (user) {
            StorageService.setItem(StorageService.USER_KEY, JSON.stringify(user));
        } else {
            StorageService.removeItem(StorageService.USER_KEY);
        }
    }

    public static get user(): User|null {
        if (StorageService._user) {
            return StorageService._user;
        }

        const data = StorageService.getItem(StorageService.USER_KEY);
        const user = data ? JSON.parse(data) : null;
        StorageService.user = user;
        return user;
    }

    public static get authToken(): string | null {
        return StorageService.getItem(StorageService.AUTH_KEY);
    }

    public static set authToken(token: string | null) {
        StorageService.setItem(StorageService.AUTH_KEY, token);
    }

    public static clear() {
        [
            StorageService.AUTH_KEY,
        ].forEach(StorageService.removeItem);
        StorageService.user = null;
    }

    private static getItem(key: string) {
        return localStorage.getItem(StorageService.prefix + key);
    }

    private static setItem(key: string, value: any) {
        localStorage.setItem(StorageService.prefix + key, value);
    }

    private static removeItem(key: string) {
        localStorage.removeItem(StorageService.prefix + key);
    }
}
