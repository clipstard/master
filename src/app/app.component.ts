import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/services/storage.service';
import { SpinnerService } from '@app/services/spinner.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    displaySpinner = true;

    constructor(
        private spinnerService: SpinnerService,
    ) {
        StorageService.user = StorageService.user;
    }

    ngOnInit() {
        this.spinnerService.spinnerChanges.subscribe((value => this.displaySpinner = value > 0));
    }
}
