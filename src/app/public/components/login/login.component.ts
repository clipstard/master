import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            username: this.fb.control(null, [Validators.required]),
            password: this.fb.control(null, [Validators.required]),
        });
    }

    submit() {
        const { username, password } = this.form.value;
        this.userService.login(username, password).subscribe((user) => {
            this.router.navigate(['/', user.type.toLowerCase() ]);
        });
    }
}
