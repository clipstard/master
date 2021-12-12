import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from '@shared/dashboard/dashboard.component';
import { UserProfileComponent } from '@shared/user-profile/user-profile.component';
import { TableListComponent } from '@shared/table-list/table-list.component';
import { NotificationsComponent } from '@app/notifications/notifications.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';


@NgModule({
    imports: [
        RouterModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        CommonModule,
        MatIconModule,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        NotificationsComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent,
    ],
    exports: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        NotificationsComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent,
    ]
})

export class SharedModule {
}
