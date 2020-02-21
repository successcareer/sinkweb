import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ServiceDetailComponent } from './servicedetail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { SettingService } from 'app/service/setting.service';
import { MatDialogModule } from '@angular/material/dialog'

const routes = [
    {
        path     : 'service/:id',
        component: ServiceDetailComponent,
        resolve  : {
            data: SettingService
        }
    }
];

@NgModule({
    declarations: [
        ServiceDetailComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatRippleModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatDialogModule
    ],
    exports     : [
        ServiceDetailComponent
    ]
})

export class ServiceDetailModule
{
}
