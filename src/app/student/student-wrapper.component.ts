import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { buildRoute, RouteInfo } from '../../misc';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
    selector: 'app-student-wrapper',
    templateUrl: './student-wrapper.component.html',
    styleUrls: ['./student-wrapper.component.scss'],
})
export class StudentWrapperComponent implements OnInit {

    currentRoute = 'Dashboard';

    menuItems: RouteInfo[] = [
        buildRoute({ path: '/student/dashboard', title: 'Tasks', icon: 'task', displayInMenu: true }),
    ];

    notifications = [
        'Task 12 was assigned to you',
        'Task 13 was assigned to you',
    ];

    fixedMenuOpened = false;

    constructor(
        private router: Router,
    ) {
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
                this.currentRoute = 'Task List';
            }
        });
    }

    ngOnInit() {
        const window_width = $(window).width();
        const $sidebar = $('.sidebar');
        const $sidebar_responsive = $('body > .navbar-collapse');
        const $sidebar_img_container = $sidebar.find('.sidebar-background');


        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }

        }

        $('.fixed-plugin a').click(function (event) {
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .badge').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            const new_color = $(this).data('color');

            if ($sidebar.length !== 0) {
                $sidebar.attr('data-color', new_color);
            }

            if ($sidebar_responsive.length !== 0) {
                $sidebar_responsive.attr('data-color', new_color);
            }
        });

        $('.fixed-plugin .img-holder').click(function () {
            const $full_page_background = $('.full-page-background');

            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');


            const new_image = $(this).find('img').attr('src');

            if ($sidebar_img_container.length !== 0) {
                $sidebar_img_container.fadeOut('fast', function () {
                    $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                    $sidebar_img_container.fadeIn('fast');
                });
            }

            if ($full_page_background.length !== 0) {

                $full_page_background.fadeOut('fast', function () {
                    $full_page_background.css('background-image', 'url("' + new_image + '")');
                    $full_page_background.fadeIn('fast');
                });
            }

            if ($sidebar_responsive.length !== 0) {
                $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
            }
        });
    }

}
