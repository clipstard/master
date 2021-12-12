import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from '@app/public/components/login/login.component';
import { IsNotAuthenticatedGuard } from '@app/guards/is-not-authenticated.guard';

export const PublicRoutes: Routes = [
    {
        path: '',
        component: PublicComponent,
        canActivate: [IsNotAuthenticatedGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
        ],
    },
];
