import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfessorComponent } from './professor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { ProfessorRoutes } from '@app/professor/professor.routing';
import { ProfessorsComponent } from '@app/professor/professors/professors.component';
import { StudentsComponent } from '@app/professor/students/students.component';
import { CreateTaskComponent } from '@app/professor/create-task/create-task.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TasksComponent } from '@app/professor/tasks/tasks.component';


@NgModule({
    imports: [
        RouterModule.forChild(ProfessorRoutes),
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
        ProfessorComponent,
        ProfessorsComponent,
        StudentsComponent,
        CreateTaskComponent,
        TasksComponent,
    ],
})

export class ProfessorModule {
}
