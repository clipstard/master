import { Type } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { UserService } from '@app/services/user.service';
import { StorageService } from '@app/services/storage.service';
import { SpinnerService } from '@app/services/spinner.service';

export const Services: Type<any>[] = [
    HttpService,
    UserService,
    SpinnerService,
    StorageService,
];
