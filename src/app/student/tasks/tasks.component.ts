import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { pluck } from 'rxjs/operators';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

    tasks: any[] = [];

    constructor(
        private httpService: HttpService,
    ) {
    }

    ngOnInit() {
        this.httpService.get('tasks').pipe(pluck('hydra:member')).subscribe((tasks) => {
            this.tasks = tasks;
        });
    }

    togglePublic(id: number) {
        const index = this.tasks.findIndex(item => item.id === id);
        const task = this.tasks[index];

        this.httpService.put(`tasks/${id}`, { ...task, public: !task.public }).subscribe(() => {
            this.tasks.splice(index, 1, {...task, public: !task.public });
        });
    }
}
