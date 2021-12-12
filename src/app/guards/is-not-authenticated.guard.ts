import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '@app/services/storage.service';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {

    constructor(
        private router: Router,
    ) {
    }

    canActivate(): Promise<boolean>|boolean {
        if (StorageService.isAuthenticated) {
            return this.router.navigate(['/', StorageService.user.type.toLowerCase()]);
        }

        return true;
    }
}
