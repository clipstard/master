import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentWrapperComponent } from './student-wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { CreateTaskComponent } from '@app/student/create-task/create-task.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TasksComponent } from '@app/student/tasks/tasks.component';
import { StudentRoutes } from '@app/student/student.routing';


@NgModule({
    imports: [
        RouterModule.forChild(StudentRoutes),
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
        CodemirrorModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
    ],
    declarations: [
        StudentWrapperComponent,
        CreateTaskComponent,
        TasksComponent,
    ],
})

export class StudentModule {
}
