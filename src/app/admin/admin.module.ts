import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { AdminWrapperComponent } from './admin-wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfessorsComponent } from '@app/admin/professors/professors.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { StudentsComponent } from '@app/admin/students/students.component';


@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes),
        RouterModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        CommonModule,
        MatIconModule,
        SharedModule,
    ],
    declarations: [
        AdminWrapperComponent,
        ProfessorsComponent,
        StudentsComponent,
    ],
})

export class AdminModule {
}
