import { Routes } from '@angular/router';
import { AdminWrapperComponent } from './admin-wrapper.component';
import { DashboardComponent } from '@shared/dashboard/dashboard.component';
import { IsAuthenticatedGuard } from '@app/guards/is-authenticated.guard';
import { ProfessorsComponent } from '@app/admin/professors/professors.component';
import { StudentsComponent } from '@app/admin/students/students.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        component: AdminWrapperComponent,
        canActivate: [IsAuthenticatedGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'professors', component: ProfessorsComponent },
            { path: 'students', component: StudentsComponent },
        ],
    },
];
