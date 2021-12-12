import { Injectable } from '@angular/core';
import { delay, distinctUntilChanged, switchMap, tap, throttle } from 'rxjs/operators';
import { BehaviorSubject, interval, Observable, of, Subject } from 'rxjs';


@Injectable()
export class SpinnerService {

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
