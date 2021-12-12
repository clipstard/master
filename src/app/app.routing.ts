import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
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
