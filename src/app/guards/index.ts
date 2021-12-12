import { Type } from '@angular/core';
import { IsAuthenticatedGuard } from '@app/guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from '@app/guards/is-not-authenticated.guard';

export const Guards: Type<any>[] = [
    IsAuthenticatedGuard,
    IsNotAuthenticatedGuard,
];
