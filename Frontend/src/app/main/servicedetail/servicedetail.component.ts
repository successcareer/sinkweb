import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { locale as english } from './i18n/en';
import { locale as russian } from './i18n/ru';
import { fuseAnimations } from '@fuse/animations';
import { ServiceDetail } from './service.model';
import { SettingService } from 'app/service/setting.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';
import {ConfirmationDialog} from '../confirmdialog/confirmdialog.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'servicedetail',
    templateUrl: './servicedetail.component.html',
    styleUrls: ['./servicedetail.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ServiceDetailComponent implements OnInit, OnDestroy
{
    pageType: string;
    serviceDetail: ServiceDetail;
    serviceForm: FormGroup;
    private _unsubscribeAll: Subject<any>;
    _id: string;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private settingService: SettingService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private _translateService: TranslateService,
        private router: Router
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, russian);
        this.serviceDetail = new ServiceDetail();
        this._unsubscribeAll = new Subject();
        
    }

    ngOnInit(): void {
        this._id = this.route.snapshot.params.id
        this.settingService.onServiceChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
            if(response) {
                this.serviceDetail = new ServiceDetail(response)
                this.pageType = 'edit';
            } else {
                this.pageType = 'new';
                this.serviceDetail = new ServiceDetail();
            }
            this.serviceForm = this.createProductForm()
        })
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    addService() {
        const data = this.serviceForm.getRawValue();
        this.settingService.add(data).then(response => {
            this.router.navigateByUrl('/service')
        })
    }

    saveService() {
        this.saveDialog();
    }

    createProductForm(): FormGroup
    {
        return this._formBuilder.group({
            name            : [this.serviceDetail.name],
            price          : [this.serviceDetail.price]
        });
    }

    saveDialog() {
        const dialogRef = this.dialog.open(ConfirmationDialog,{
            data:{
                message: this._translateService.instant("SAVEDIALOG"),
                buttonText: {
                    ok: this._translateService.instant("YES"),
                    cancel: this._translateService.instant("NO")
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                const data = this.serviceForm.getRawValue();
                data._id = this._id
                this.settingService.update(data).then(response => {
                    this.router.navigateByUrl('/service')
                })
            }
        });
    }
}
