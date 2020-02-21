import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SinkDetailComponent } from './sinkdetail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { SinkService } from 'app/service/sink.service';
import {MatSelectModule} from '@angular/material/select';

const routes = [
    {
        path     : 'sink/:id',
        component: SinkDetailComponent,
        resolve  : {
            data: SinkService
        }
    }
];

@NgModule({
    declarations: [
        SinkDetailComponent
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
        MatSelectModule
    ],
    exports     : [
        SinkDetailComponent
    ]
})

export class SinkDetailModule
{
}
