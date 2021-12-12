import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {

    editMode = false;
    assignTypes = [
        { value: 'unassigned', label: 'Unassigned' },
        { value: 'student', label: 'Student' },
        { value: 'group', label: 'Group' },
    ];

    students: any[] = [];
    groups: any[] = [];
    task: any;
    id: number;

    form: FormGroup;
    codemirrorOptions: any = {
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets : true,
        autofocus: true,
        extraKeys: {'Ctrl-Space': 'autocomplete'},
        hintOptions: {tables: {
                users: ['name', 'score', 'birthDate'],
                countries: ['name', 'population', 'size']
            },
        },
        showHint: true,
        inputStyle: 'contenteditable',
        theme: 'default',
        mode: 'text/x-sql',
        lineWrapping : true,
    };

    sqlCode = 'SELECT * FROM `users`;';

    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const id = this.route.snapshot.params.id;
        if (id) {
            this.id = parseInt(id, 10);
        }
    }

    ngOnInit() {
        this.initForm();
        this.initTask();
        this.form.get('assignType').valueChanges.subscribe((v) => {
            if (v === 'student') {
                this.refreshStudents();
            }

            if (v === 'group') {
                this.refreshGroups();
            }
        });
    }

    initTask() {
        if (this.id) {
            this.httpService.get(`tasks/${this.id}`).subscribe((res) => {
                this.task = res;
                let assignType = 'unassigned';
                if (res.groups?.length) {
                    assignType = 'group';
                } else if (res.assignedTo?.length) {
                    assignType = 'student';
                }

                this.form.get('assignType').setValue(assignType);
                this.form.get('public').setValue(res.public);
                this.form.get('selectedStudents').setValue(res.assignedTo?.map(i => i['@id']));
                this.form.get('selectedGroups').setValue(res.groups?.map(i => i['@id']));
                this.form.get('description').setValue(res.condition);
            });
        }
    }

    initForm() {
        this.form = this.fb.group({
            assignType: this.fb.control('unassigned'),
            selectedStudents: this.fb.control([]),
            selectedGroups: this.fb.control([]),
            public: this.fb.control(false),
            description: this.fb.control(null),
        });
    }

    submit() {
        if (this.id) {
            this.updateTask();
        } else {
            this.createTask();
        }
    }

    updateTask() {
        const value = this.form.value;
        this.httpService.put(`tasks/${this.id}`, {
            public: !!value.public,
            assignedTo: value.selectedStudents,
            groups: value.selectedGroups,
            condition: value.description,
            id: this.id,
        }).subscribe(() => this.router.navigate(['tasks']));
    }

    createTask() {
        console.log(this.form.value);
    }

    refreshStudents() {
        this.httpService.get('students').pipe(pluck('hydra:member')).subscribe((result) => {
            this.students = result;
        });
    }

    refreshGroups() {
        this.httpService.get('groups').pipe(pluck('hydra:member')).subscribe((result) => {
            this.groups = result;
        });
    }
}
