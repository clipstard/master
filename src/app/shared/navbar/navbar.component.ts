import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouteInfo } from '@src/misc';
import { StorageService } from '@app/services/storage.service';
import { UserService } from '@app/services/user.service';
import { UserType } from '@enums/user.type';
import { NotificationInterface } from '@interfaces/notificationInterface';

declare var window: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    @Input() menuItems: RouteInfo[] = [];
    @Input() currentRoute = 'Dashboard';
    @Input() notifications: NotificationInterface[] = [];

    isAuthenticated = false;
    isAdmin = false;

    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        private location: Location,
        private element: ElementRef,
        private router: Router,
        private userService: UserService,
    ) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.isAuthenticated = StorageService.isAuthenticated;
        this.isAdmin = StorageService.user?.type === UserType.Admin;

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            window.$layer = document.getElementsByClassName('close-layer')[0];
            if (window.$layer) {
                window.$layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    read(notification: NotificationInterface) {
        this.userService.readNotification(notification.id).subscribe();
    }

    logout() {
        this.userService.logout();
    }

    get unreadNotifications() {
        return this.notifications.filter((e) => !e.read).length;
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    }

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible === 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if (window.$layer) {
                window.$layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);


            // tslint:disable-next-line
            window.$layer = document.createElement('div');
            window.$layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild(window.$layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild(window.$layer);
            }

            setTimeout(function () {
                window.$layer.classList.add('visible');
            }, 100);

            window.$layer.onclick = function () {
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                window.$layer.classList.remove('visible');
                setTimeout(function () {
                    window.$layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    }
}
