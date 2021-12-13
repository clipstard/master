import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    { path: 'professor', loadChildren: () => import('./professor/professor.module').then(m => m.ProfessorModule)},
    { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)},
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false,
            urlUpdateStrategy: 'eager',
        }),
    ],
    exports: [],
})
export class AppRoutingModule {
}
