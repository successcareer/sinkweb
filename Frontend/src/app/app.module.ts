import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ServiceModule } from 'app/main/service/service.module';
import { DashboardModule } from 'app/main/dashboard/dashboard.module';
import { SinkModule } from 'app/main/sink/sink.module'
import { Feathers } from './service/feathers.service';
import { SettingService } from './service/setting.service';
import { ServiceDetailModule } from 'app/main/servicedetail/servicedetail.module'
import { SinkService } from './service/sink.service';
import { DashboardService } from './service/dashboard.service'
import { SinkDetailModule } from './main/sinkdetail/sinkdetail.module';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,
        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        ServiceModule,
        DashboardModule,
        SinkModule,
        ServiceDetailModule,
        SinkDetailModule
    ],
    providers: [
        Feathers,
        SettingService,
        SinkService,
        DashboardService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
