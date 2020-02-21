import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
const routes = [
    {
        path     : 'dashboard',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        ChartsModule
    ],
    exports     : [
        DashboardComponent
    ]
})

export class DashboardModule
{
}
