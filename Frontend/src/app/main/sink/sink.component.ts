import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { locale as english } from './i18n/en';
import { locale as russian } from './i18n/ru';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { SinkService } from 'app/service/sink.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment'
import { Feathers } from 'app/service/feathers.service';
import {ConfirmationDialog} from '../confirmdialog/confirmdialog.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sink',
    templateUrl: './sink.component.html',
    styleUrls: ['./sink.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class SinkComponent implements OnInit
{
    dataSource = [];
    datalength = 0;
    displayedColumns = ['carnumber', 'carmake', 'carmodel', 'boxnumber', 'services', 'Action'];
    dateForm: FormGroup;
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _sinkService: SinkService,
        private _formBuilder: FormBuilder,
        private _feathers: Feathers,
        private dialog: MatDialog,
        private _translateService: TranslateService,
    )
    {
    }

    ngOnInit(): void {
        this._fuseTranslationLoaderService.loadTranslations(english, russian);
        this.dateForm = this.createDateForm()
        this.getDataSource()
        
        this._feathers.service('sink').on('created', message => {
            this.getDataSource()
        })
        this._feathers.service('sink').on('patched', message => {
            this.getDataSource()
        })
        this._feathers.service('sink').on('removed', message => {
            this.getDataSource()
        })
        
    }

    getDataSource(): void {
       let query = {}
        let date_array = []
        if(this.dateForm.controls.start.value !== null) {
            let startDate = new Date(moment(this.dateForm.controls.start.value).format('YYYY/MM/DD'))
            date_array.push({
                createdAt: {
                    $gte: startDate
                }
            })
        }
        if(this.dateForm.controls.end.value !== null) {
            let endDate = new Date(moment(this.dateForm.controls.end.value).format('YYYY/MM/DD'))
            date_array.push({
                createdAt: {
                    $lte: endDate
                }
            })
        }
        if(date_array.length > 0) {
            query['$and'] = date_array
        }
        let pageIndex = this.paginator.pageIndex
        let pageSize = this.paginator.pageSize

        query['$skip'] = pageIndex * pageSize
        query['$limit'] = pageSize
        this._sinkService.find(query).then(response => {
            this.dataSource = response.data
            this.datalength = response.length
        })
    }

    deleteSink(id){
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
                this._sinkService.delete(id).then(response => {
                })
            }
        });
    }
    searchSink(){
        this.paginator.pageIndex = 0
        this.paginator.pageSize = 10
        this.getDataSource()
        
    }

    createDateForm(): FormGroup
    {
        return this._formBuilder.group({
            start        : [],
            end          : []
        });
    }
    
}
