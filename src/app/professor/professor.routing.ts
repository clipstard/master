import { Routes } from '@angular/router';
import { ProfessorComponent } from './professor.component';
import { DashboardComponent } from '@shared/dashboard/dashboard.component';
import { IsAuthenticatedGuard } from '@app/guards/is-authenticated.guard';
import { ProfessorsComponent } from '@app/admin/professors/professors.component';
import { StudentsComponent } from '@app/admin/students/students.component';
import { CreateTaskComponent } from '@app/professor/create-task/create-task.component';
import { TasksComponent } from '@app/professor/tasks/tasks.component';

export const ProfessorRoutes: Routes = [
    {
        path: '',
        component: ProfessorComponent,
        canActivate: [IsAuthenticatedGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'professors', component: ProfessorsComponent },
            { path: 'task', component: CreateTaskComponent },
            { path: 'task/:id', component: CreateTaskComponent },
            { path: 'students', component: StudentsComponent },
            { path: 'tasks', component: TasksComponent },
        ],
    },
];
