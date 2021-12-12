import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicRoutes } from './public.routing';
import { PublicComponent } from './public.component';
import { LoginComponent } from '@app/public/components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        RouterModule.forChild(PublicRoutes),
        MatInputModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatButtonModule,
    ],
    declarations: [
        PublicComponent,
        LoginComponent,
    ],
})

export class PublicModule {
}
