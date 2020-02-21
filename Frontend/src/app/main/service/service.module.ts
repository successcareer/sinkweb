import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ServiceComponent } from './service.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { ConfirmationDialog } from '../confirmdialog/confirmdialog.component'
import { MatDialogModule } from '@angular/material/dialog'

const routes = [
    {
        path     : 'service',
        component: ServiceComponent
    }
];

@NgModule({
    declarations: [
        ServiceComponent,
        ConfirmationDialog
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        MatIconModule,
        MatButtonModule,
        FuseSharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatDialogModule
    ],
    exports: [
        ServiceComponent
    ]
})

export class ServiceModule
{
}
