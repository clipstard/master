import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { buildRoute, RouteInfo } from '../../misc';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { NotificationInterface } from '../../interfaces/notificationInterface';
import { interval } from 'rxjs';
import { UserService } from '../services/user.service';
import { SpinnerService } from '../services/spinner.service';


@Component({
    selector: 'app-professor-wrapper',
    templateUrl: './professor-wrapper.component.html',
    styleUrls: ['./professor-wrapper.component.scss'],
})
export class ProfessorWrapperComponent implements OnInit {


    firstLoad = true;
    currentRoute = 'Dashboard';
    audio = new Audio('/assets/notification.mp3');

    menuItems: RouteInfo[] = [
        buildRoute({ path: '/professor/dashboard', title: 'Dashboard', icon: 'dashboard' }),
        buildRoute({ path: '/professor/tasks', title: 'Tasks', icon: 'task', displayInMenu: true }),
    ];

    notifications: NotificationInterface[] = [];

    fixedMenuOpened = false;

    constructor(
        private router: Router,
        private userService: UserService,
    ) {
        this.audio.load();

        this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
            const url = this.router.url;
            if (url.includes('tasks')) {
                this.currentRoute = 'Tasks list';
            } else if (url.includes('task/')) {
                this.currentRoute = 'Edit Task';
            } else if (url.includes('task')) {
                this.currentRoute = 'Create Task';
            } else if (url.includes('groups')) {
                this.currentRoute = 'Groups list';
            } else if (url.includes('students')) {
                this.currentRoute = 'Students list';
            } else {
                this.currentRoute = 'Dashboard';
            }
        });
    }

    ngOnInit() {
        this.subscribeToNotifications();
        SpinnerService.bindJquery($);
    }

    subscribeToNotifications() {
        interval(3000).pipe(
            startWith(1),
            switchMap(() => this.userService.getNotifications())
        ).subscribe((result) => {
            if (!UserService.arrayDiff(result, this.notifications)) {
                this.notifications = result;

                if (!this.firstLoad && this.notifications.some(e => !e.read)) {
                    this.audio.play();
                }

                this.firstLoad = false;
            }
        });
    }
}
