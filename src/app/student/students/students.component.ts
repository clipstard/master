import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { pluck } from 'rxjs/operators';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {

    students: any[] = [];

    constructor(
        private httpService: HttpService,
    ) {
    }

    ngOnInit() {
        this.httpService.get('students').pipe(pluck('hydra:member')).subscribe((students) => {
            this.students = students;
        });
    }

    deleteStudent(id: number) {
        this.httpService.delete(`students/${id}`).subscribe(() => {
            this.students = this.students.filter((item) => item.id !== id);
        });
    }
}
