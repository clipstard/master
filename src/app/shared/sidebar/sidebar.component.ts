import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from '@src/misc';
import { StorageService } from '@app/services/storage.service';
import { UserType } from '@enums/user.type';

declare const $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    @Input() menuItems: RouteInfo[] = [];
    @Input() notifications = [];
    isAdmin = false;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.isAdmin = StorageService.user?.type === UserType.Admin;
        this.menuItems = this.menuItems.map(item => ({...item})).filter(menuItem => menuItem.displayInMenu);
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    }
}
