import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SinkComponent } from './sink.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog'

const routes = [
    {
        path     : 'sink',
        component: SinkComponent
    }
];

@NgModule({
    declarations: [
        SinkComponent
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
        MatDialogModule
    ],
    exports     : [
        SinkComponent
    ]
})

export class SinkModule
{
}
