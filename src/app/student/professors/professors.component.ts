import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { pluck } from 'rxjs/operators';

@Component({
    selector: 'app-professors',
    templateUrl: './professors.component.html',
    styleUrls: ['./professors.component.scss'],
})
export class ProfessorsComponent implements OnInit {

    professors: any[] = [];

    constructor(
        private httpService: HttpService,
    ) {
    }

    ngOnInit() {
        this.httpService.get('professors').pipe(pluck('hydra:member')).subscribe((professors) => {
            this.professors = professors;
        });
    }

    deleteProfessor(id: number) {
        this.httpService.delete(`professors/${id}`).subscribe(() => {
            this.professors = this.professors.filter((item) => item.id !== id);
        });
    }
}
