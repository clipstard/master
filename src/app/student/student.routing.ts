import { Routes } from '@angular/router';
import { StudentWrapperComponent } from './student-wrapper.component';
import { IsAuthenticatedGuard } from '@app/guards/is-authenticated.guard';
import { TasksComponent } from '@app/student/tasks/tasks.component';
import { CreateTaskComponent } from '@app/student/create-task/create-task.component';

export const StudentRoutes: Routes = [
    {
        path: '',
        component: StudentWrapperComponent,
        canActivate: [IsAuthenticatedGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: TasksComponent },
            { path: 'task/:id', component: CreateTaskComponent },
        ],
    },
];
