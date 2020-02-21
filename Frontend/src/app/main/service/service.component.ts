import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { locale as english } from './i18n/en';
import { locale as russian } from './i18n/ru';
import { SettingService } from 'app/service/setting.service';
import { fuseAnimations } from '@fuse/animations';
import { Feathers } from 'app/service/feathers.service';
import {ConfirmationDialog} from '../confirmdialog/confirmdialog.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ServiceComponent implements OnInit
{
    dataSource = [];
    displayedColumns = ['Name', 'Price', 'Action'];
    datalength = 0;
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _settingService: SettingService,
        private _feathers: Feathers,
        private dialog: MatDialog,
        private _translateService: TranslateService,
    )
    {
        
    }

    ngOnInit(): void {
        this._fuseTranslationLoaderService.loadTranslations(english, russian);
        this.getDataSource()
        
        this._feathers.service('setting').on('created', message => {
            this.getDataSource()
        })
        this._feathers.service('setting').on('patched', message => {
            this.getDataSource()
        })
        this._feathers.service('setting').on('removed', message => {
            this.getDataSource()
        })
    }

    getDataSource(): void {
        let pageIndex = this.paginator.pageIndex
        let pageSize = this.paginator.pageSize
        let query = {
            $skip: pageIndex * pageSize,
            $limit: pageSize
        }
        this._settingService.find(query).then(response => {
            this.dataSource = response.data
            this.datalength = response.length
        })
    }

    deleteService(id) {
        
        this.openDialog(id)
    }

    openDialog(id) {
        const dialogRef = this.dialog.open(ConfirmationDialog,{
            data:{
            message: this._translateService.instant("DELETEDIALOG"),
            buttonText: {
                ok: this._translateService.instant("YES"),
                cancel: this._translateService.instant("NO")
            }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                 this._settingService.delete(id).then(response => {
                })
            }
        });
    }
}
