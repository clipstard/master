import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from '@src/misc';
import { StorageService } from '@app/services/storage.service';
import { UserType } from '@enums/user.type';
import { NotificationInterface } from '@interfaces/notificationInterface';
import { UserService } from '@app/services/user.service';

declare const $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    @Input() menuItems: RouteInfo[] = [];
    @Input() notifications: NotificationInterface[] = [];

    isAdmin = false;

    constructor(
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.isAdmin = StorageService.user?.type === UserType.Admin;
        this.menuItems = this.menuItems.map(item => ({...item})).filter(menuItem => menuItem.displayInMenu);
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    }

    read(notification: NotificationInterface) {
        this.userService.readNotification(notification.id).subscribe();
    }

    get unreadNotifications() {
        return this.notifications.filter((e) => !e.read).length;
    }
}
