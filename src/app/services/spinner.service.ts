import { Injectable } from '@angular/core';
import { delay, distinctUntilChanged, switchMap, tap, throttle } from 'rxjs/operators';
import { BehaviorSubject, interval, Observable, of, Subject } from 'rxjs';


@Injectable()
export class SpinnerService {

    static bindJquery($) {
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

    count = 0;
    spinnerSubject: Subject<number> = new BehaviorSubject(0);
    spinnerChanges: Observable<number> = this.spinnerSubject.pipe(
        distinctUntilChanged(),
        switchMap((count) => {
            if (count > 0) {
                return of(count);
            }

            return of(count).pipe(delay(350));
        }),
        throttle(() => interval(350)),
    );

    constructor() {
    }

    show() {
        this.count++;
        this.next();
    }

    hide() {
        this.count--;
        if (this.count < 0) {
            this.count = 0;
        }

        this.next();
    }

    next() {
        this.spinnerSubject.next(this.count);
    }
}
